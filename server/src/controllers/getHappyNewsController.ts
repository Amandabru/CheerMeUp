import { Request, Response } from 'express';
import fetch from 'node-fetch';

export async function getHappyNewsController(req: Request, res: Response) {
    const api_url = `https://api.worldnewsapi.com/search-news?min-sentiment=0.5&earliest-publish-date=2023-09-01&api-key=${process.env.API_KEY_NEWS}`;
    const response = await fetch(api_url);
    const data = await response.json();

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

    const selectedData = data.news.map(selectFewerProps);

    res.json(selectedData);
}
