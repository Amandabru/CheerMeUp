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
        if (!response.ok) throw createHttpError(500, 'Failed to fetch joke');
        const data = await response.json();

        /* External Jokes API response errors are stored in boolean error parameter*/
        if (data.error) {
            throw createHttpError(500, data.data);
        }
        const selectedData = {
            type: 'joke',
            text:
                data.type === 'single'
                    ? data.joke
                    : data.setup + '\n' + data.delivery,
            apiId: data.id
        };

        if (!req.session.userId) {
            res.status(200).json(selectedData);
            return;
        }
        res.status(200).json(selectedData);
    } catch (error) {
        next(error);
    }
}
