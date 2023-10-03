import { Request, Response } from 'express';
import fetch from 'node-fetch';

export async function getMemesController(req: Request, res: Response) {
    //get ten random memes. To be specified furhter, depending on the request
    //still needs error handling
    const api_url = 'https://meme-api.com/gimme/10';
    const response = await fetch(api_url);
    const data = await response.json();

    type MemeType = {
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

    function selectFewerProps(meme: MemeType) {
        const { title, url, preview } = meme;
        return { type: 'meme', title, url, preview };
    }

    data.memes = data.memes.map(selectFewerProps);
    res.json(data);
}
