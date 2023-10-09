import { NextFunction, Request, Response } from 'express';
import JoyModel from '../models/Joys';
import UserModel from '../models/User';
import createHttpError from 'http-errors';

export async function patchLikeController(req: Request, res: Response, next: NextFunction) {
    const joyToUpdate = req.body;
    const id = joyToUpdate.id;
    const type = joyToUpdate.type;
    const searchParamValue = joyToUpdate.searchParamValue;

    const alreadyLiked = await UserModel.findOne( { _id: req.session.userId, [`likedPosts.${type}.id`]: id });

    if(!alreadyLiked){
        JoyModel.updateOne({ _id: id}, {$inc: {likes: 1}, $set: {lastLiked: Date.now()}}).exec()
        .then(async (result:any) => {
            // Is only false if both updates don't work
            if (result.acknowledged) {
                try {
                    await UserModel.updateOne(
                      { _id: req.session.userId },
                      { $push: {[`likedPosts.${type}`]: {id: id, key: searchParamValue}} }
                    ).exec();
                    res.status(201).end();
                } 
                catch (error) {
                    next(error)
                }
            } 
            else {
                throw createHttpError(304, 'No documents were modified');
            }
        })
        .catch((error) => {
            next(error)
        });
    }
    else{
        JoyModel.updateOne({ _id: id}, {$inc: {likes: -1}}).exec()
        .then(async (result:any) => {
            if (result.acknowledged) {
                try {
                    await UserModel.updateOne(
                      { _id: req.session.userId },
                      { $pull: {[`likedPosts.${type}`]: { id: id }} }
                    ).exec();
                    res.status(201).end();
                } 
                catch (error) {
                    next(error)
                }
            } 
            else {
                throw createHttpError(304, 'No documents were modified');
            }
        })
        .catch((error) => {
            next(error)
        });
    }
}