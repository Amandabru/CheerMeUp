import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import fetch from 'node-fetch';

export async function getActivityController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const type = req.params.type;

    let participantsQuery: string = '';
    if (type == 'social') participantsQuery = 'participants=4';

    const api_url = `http://www.boredapi.com/api/activity?type=${type}`;
    try {
        const response = await fetch(api_url);
        if (!response.ok) {
            throw createHttpError(response.status, response.statusText);
        }
        const data = await response.json();

        /* Bored API errors response messages are stored in data.error*/
        if (data.error) {
            throw createHttpError(500, data.error);
        }
        const selectedData = {
            type: 'activity',
            text: data.activity
        };
        res.status(200).json(selectedData);
    } catch (error) {
        next(error);
    }
}
