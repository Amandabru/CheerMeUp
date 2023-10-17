import { NextFunction, Request, Response } from 'express';
import JoyModel from '../models/Joys';

export async function getJoyController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const searchParam = req.params.searchParam;
        let searchParamValue = req.params.searchParamValue;
        const type = req.params.type;

        if (searchParam === 'url') {
            searchParamValue = decodeURIComponent(searchParamValue);
        }
        const existingJoy = await JoyModel.findOne({
            [`content.${searchParam}`]: searchParamValue,
            type: type
        }).exec();

        if (existingJoy) {
            res.status(200).json({ exists: true, id: existingJoy._id });
            return;
        }
        res.status(200).json({ exists: false });
    } catch (error) {
        next(error);
    }
}
