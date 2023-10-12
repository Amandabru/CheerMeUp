import { NextFunction, Request, Response } from 'express';
import JoyModel from '../models/Joys';
import createHttpError from 'http-errors';

export async function getJoyController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const searchParam = req.params.searchParam;
    const searchParamValue = req.params.searchParamValue;
    const type = req.params.type;

    const existingJoy = await JoyModel.findOne({
        [`content.${searchParam}`]: searchParamValue,
        type: type
    }).exec();

    if (existingJoy) {
        res.status(200).json({ exists: true, id: existingJoy._id });
        return;
    }

    res.status(200).json({ exists: false });
}
