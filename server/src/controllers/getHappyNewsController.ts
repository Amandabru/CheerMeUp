import { NextFunction, Request, Response } from 'express';
import fetch from 'node-fetch';
import createHttpError from 'http-errors';
import UserModel from '../models/User';

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

type UpdatedNewsType = {
    type: string,
    id: number,
    title: string,
    text: string,
    url: string,
    image: string,
    author: string,
    liked: boolean 
}


function selectFewerProps(news: NewsType): UpdatedNewsType {
    const { id, title, text, url, image, author } = news;
    return { type: 'news', id, title, text, url, image, author, liked: false };
}

export async function getHappyNewsController(
    req: Request,
    res: Response,
    next: NextFunction
) 
{
    const api_url = `https://api.worldnewsapi.com/search-news?min-sentiment=0.5&earliest-publish-date=2023-09-01&api-key=${process.env.API_KEY_NEWS}`;

    try {
        const response = await fetch(api_url);
        if (!response.ok) {
            throw createHttpError(response.status, response.statusText);
        }
        const data = await response.json();
        const selectedData = data.news.map(selectFewerProps);

        if(!req.session.userId){
            res.status(200).json(selectedData);
            return;
        }
        
        selectedData.map(async (news: UpdatedNewsType) => {
            const likedByUser = await UserModel.findOne(
                { _id: req.session.userId },
                { $push: {'likedPosts.news': selectedData.id } }
              ).exec();

            news.liked = likedByUser ? true : false;
        })

        res.status(200).json(selectedData);
    
    } catch (error) {
        next(error);
    }
}
