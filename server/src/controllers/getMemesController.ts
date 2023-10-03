import { NextFunction, Request, Response } from 'express';
import fetch from 'node-fetch';
import createHttpError from 'http-errors';

interface RedditPost {
    author: string;
    title: string;
    post_hint?: string;
    url: string;
}

export async function getMemesController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    //get 20 random memes
    const url = 'https://memes-from-reddit.p.rapidapi.com/memes';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key':
                '7325b535damshde2cb85400221d0p156514jsn5cd8c387a682',
            'X-RapidAPI-Host': 'memes-from-reddit.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) throw createHttpError(500, 'Failed to fetch memes');
        const data = await response.json();
        if (data.error) {
            throw createHttpError(500, 'Failed to fetch memes');
        }
        // only keep memes that contains an imagee
        const dataArray: RedditPost[] = data.data;
        const filteredArray = dataArray.filter(
            (item) => item.post_hint === 'image'
        );
        console.log(filteredArray);
        res.status(200).json(filteredArray);
    } catch (error) {
        next(error);
    }
}
