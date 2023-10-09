import { NextFunction, Request, Response } from 'express';
import fetch from 'node-fetch';
import createHttpError from 'http-errors';

type NewsType = {
    id: number;
    title: string;
    text: string;
    summary: string;
    url: string;
    image: string;
    author: string;
    language: string;
    source_country: string;
    sentiment: number;
};

function selectFewerProps(news: NewsType) {
    const { id, title, text, url, image, author } = news;
    return { type: 'news', id, title, text, url, image, author };
}

export async function getHappyNewsController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const api_url = `https://api.worldnewsapi.com/search-news?min-sentiment=0.5&earliest-publish-date=2023-09-01&api-key=${process.env.API_KEY_NEWS}`;

    try {
        const response = await fetch(api_url);
        if (!response.ok) {
            throw createHttpError(response.status, response.statusText);
        }
        const data = await response.json();
        const selectedData = data.news.map(selectFewerProps);
        res.status(200).json(selectedData);
    } catch (error) {
        next(error);
    }
}
