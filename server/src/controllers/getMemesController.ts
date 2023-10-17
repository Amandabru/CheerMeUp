import { NextFunction, Request, Response } from 'express';
import fetch from 'node-fetch';
import createHttpError from 'http-errors';
import UserModel from '../models/User';

type RedditPost = {
    postLink: string;
    subreddit: string;
    title: string;
    url: string;
    nsfw: boolean;
    spoiler: boolean;
    author: string;
    ups: number;
    preview: string[];
};

export async function getMemesController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    //get 20 wholesome random memes
    const api_url = 'https://meme-api.com/gimme/wholesomememes/20';

    try {
        const response = await fetch(api_url);
        if (!response.ok) {
            throw createHttpError(response.status, response.statusText);
        }
        const data = await response.json();
        if (data.error) {
            throw createHttpError(500, 'Failed to fetch memes');
        }
        const filteredArrayWithSelectedProperties = data.memes.map(
            (item: RedditPost) => ({
                type: 'meme',
                title: item.title,
                url: item.url
            })
        );
        res.status(200).json(filteredArrayWithSelectedProperties);
    } catch (error) {
        next(error);
    }
}
