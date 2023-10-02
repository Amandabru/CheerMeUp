import { NextFunction, Request, Response } from 'express';
import JoyModel from '../models/Joys';
import UserModel from '../models/User';
import createHttpError from 'http-errors';

export async function getLikeController(req: Request, res: Response, next: NextFunction) {
    const likedJoy = req.body;
    const type = likedJoy.type;

    let searchParamValue: number | string;

    if(type == "joke" || type == "news"){
        searchParamValue = likedJoy.apiId;
    }
    else if(type == "meme"){
        searchParamValue = likedJoy.url;
    }
    else{
        searchParamValue = likedJoy.text;
    }

    const searchParam = Object.keys(likedJoy).find(key => likedJoy[key] === searchParamValue);

    const existingJoy = await JoyModel.findOne({
        [`content.${searchParam}`]: searchParamValue, type: type
      }).exec();

    if(existingJoy){

        const alreadyLiked = await UserModel.findOne( { _id: req.session.userId, [`likedPosts.${type}`]: existingJoy._id });

        if(!alreadyLiked){
            JoyModel.updateOne({ _id: existingJoy._id}, {$inc: {likes: 1}, $set: {lastLiked: Date.now()}}).exec()
            .then(async (result:any) => {
                // Is only false if both updates don't work
                if (result.acknowledged) {
                    try {
                        await UserModel.updateOne(
                          { _id: req.session.userId },
                          { $push: {[`likedPosts.${type}`]: existingJoy._id } }
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
            JoyModel.updateOne({ _id: existingJoy._id}, {$inc: {likes: -1}}).exec()
            .then(async (result:any) => {
                if (result.acknowledged) {
                    try {
                        await UserModel.updateOne(
                          { _id: req.session.userId },
                          { $pull: {[`likedPosts.${type}`]: existingJoy._id } }
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
    else{
        await JoyModel.create({
            type: type,
            likes: 1,
            content: {
                title: likedJoy.hasOwnProperty("title") ? likedJoy.title : "",
                text: likedJoy.hasOwnProperty("text") ? likedJoy.text : "",
                apiId: likedJoy.hasOwnProperty("apiId") ? likedJoy.apiId : 0,
                url: likedJoy.hasOwnProperty("url") ? likedJoy.url : "",
                image: likedJoy.hasOwnProperty("image") ? likedJoy.image : "",
            }
        })  
        .then(async (createdJoy) => {
            if (createdJoy) {
              try {
                console.log(createdJoy._id)
                await UserModel.updateOne(
                    { _id: req.session.userId },
                    { $push: {[`likedPosts.${type}`]: createdJoy._id } }
                  ).exec();
                res.status(201).end();
              } 
              catch (error) {
                next(error);
              }
            } 
            else {
                throw createHttpError(500, 'Failed to create the document');
            }
        })
        .catch((error) => {
            next(error)
        });
    }
  }
  