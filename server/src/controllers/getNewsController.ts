import { NextFunction, Request, Response } from 'express';
import fetch from 'node-fetch';
import createHttpError from 'http-errors';
import { NewsType } from '../Types';

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
    const api_url = `https://newsapi.org/v2/everything?q=heartwarming OR wholesome OR heartening OR heartfelt OR kindhearted OR cheerful OR touching OR virtous OR adorable NOT dead NOT sad NOT bad&apiKey=8fafe083ade7461a8b3cfa565c54a21d`;

    try {
        const response = await fetch(api_url);
        if (!response.ok) {
            throw createHttpError(response.status, response.statusText);
        }

        const data = await response.json();

        const filteredArticles = data.articles
            .map((article: NewsArticle) => ({
                type: 'news',
                source: article.source.name,
                author: article.author,
                title: article.title,
                text: article.description,
                url: article.url,
                urlToImage: article.urlToImage,
                publishedAt: article.publishedAt.substring(0, 10)
            }))
            .filter((article: NewsType) => {
                return (
                    article.source &&
                    article.author &&
                    article.title &&
                    article.text &&
                    article.url &&
                    article.urlToImage &&
                    article.publishedAt
                );
            });
        res.status(200).json(filteredArticles);
    } catch (error) {
        next(error);
    }
}
