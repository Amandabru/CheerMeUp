import { NextFunction, Request, Response } from 'express';
import fetch from 'node-fetch';
import createHttpError from 'http-errors';
import UserModel from '../models/User';

export type NewsArticle = {
    source: { id: string; name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
};

export async function getNewsController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const api_url =
        'https://newsapi.org/v2/everything?q=heartwarming OR wholesome OR heartening OR heartfelt OR kindhearted OR cheerful OR touching OR virtous OR adorable&apiKey=8fafe083ade7461a8b3cfa565c54a21d';

    try {
        const response = await fetch(api_url);
        if (!response.ok) {
            throw createHttpError(response.status, response.statusText);
        }
        const data = await response.json();

        const filteredArticles = data.articles.map((article: NewsArticle) => ({
            type: 'news',
            liked: false,
            ...article
        }));

        if (!req.session.userId) {
            res.status(200).json(filteredArticles);
            return;
        }

        for (const news of data.articles) {
            const likedByUser = await UserModel.findOne({
                _id: req.session.userId,
                'likedPosts.news.key': news.apiId
            }).exec();

            news.liked = likedByUser ? true : false;
        }

        res.status(200).json(filteredArticles);
    } catch (error) {
        next(error);
    }
}
