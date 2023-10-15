import { NextFunction, Request, Response } from 'express';
import JoyModel from '../models/Joys';
import createHttpError from 'http-errors';

export async function getPopularController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const number = parseInt(req.params.number);
    const sortBy = req.params.sortBy;

    JoyModel.find()
        .sort(sortBy === 'likes' ? { likes: -1 } : { lastLiked: -1 })
        .limit(number)
        .then((topList) => {
            if (topList) {
                res.status(200).json(topList);
            } else {
                throw createHttpError(500, 'Could not get toplist');
            }
        })
        .catch((error) => {
            next(error);
        });
}
