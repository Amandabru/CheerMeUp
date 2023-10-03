import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import fetch from 'node-fetch';

export async function getJokeController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const categories = req.params.categories.split(',');
    const api_url = `https://v2.jokeapi.dev/joke/${categories.join(
        ','
    )}?safe-mode&type=single`;
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
            text: data.joke,
            apiId: data.id
        };
        res.status(200).json(selectedData);
    } catch (error) {
        next(error);
    }
}
