import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import fetch from 'node-fetch';
import UserModel from '../models/User';

export async function getSuggestionsController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const type = req.params.type;
    const multipleParticipants = req.params.multipleParticipants;

    let participantsQuery: string = '';
    if (multipleParticipants == 'false') participantsQuery = 'participants=1';

    const api_url = `http://www.boredapi.com/api/activity?${participantsQuery}&type=${type}`;
    try {
        const response = await fetch(api_url);
        if (!response.ok) {
            throw createHttpError(500, 'Failed to fetch suggestion');
        }
        const data = await response.json();

        /* External Jokes API response errors are stored in boolean error parameter*/
        if (data.error) {
            throw createHttpError(500, data.error);
        }
        const selectedData = {
            type: 'suggestion',
            text: data.activity
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
