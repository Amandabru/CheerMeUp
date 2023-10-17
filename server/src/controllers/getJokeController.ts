import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import fetch from 'node-fetch';
import UserModel from '../models/User';

export async function getJokeController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const categories = req.params.categories;
    const api_url = `https://v2.jokeapi.dev/joke/${categories}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`;
    try {
        const response = await fetch(api_url);
        if (!response.ok) {
            throw createHttpError(response.status, response.statusText);
        }
        const data = await response.json();

        /* External Jokes API returns whether an error occured in a boolean error 
        parameter and the error message in data.message*/
        if (data.error) {
            throw createHttpError(500, data.message);
        }
        const selectedData = {
            type: 'joke',
            text:
                data.type === 'single'
                    ? data.joke
                    : data.setup + '\n' + data.delivery,
            apiId: data.id
        };
        res.status(200).json(selectedData);
    } catch (error) {
        next(error);
    }
}
