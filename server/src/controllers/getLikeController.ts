import { Request, Response } from 'express';
import JoyModel from '../models/Joys';
import UserModel from '../models/User';
import createHttpError from 'http-errors';

export async function getLikeController(req: Request, res: Response) {
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
        JoyModel.updateOne({ _id: existingJoy._id}, {$inc: {likes: 1}, $set: {lastLiked: Date.now()}}).exec()
        .then(async (result:any) => {
            // Is only false if both updates don't work
            if (result.acknowledged) {
                try {
                    await UserModel.updateOne(
                      { _id: req.params.session },
                      { [`likedPosts.${searchParam}`]: existingJoy._id }
                    );
                    res.status(201).json(existingJoy);
                } 
                catch (error) {
                    throw createHttpError(500, 'Failed to update the user like');
                }
            } 
            else {
                throw createHttpError(304, 'No documents were modified');
            }
        })
        .catch(() => {
            throw createHttpError(500, 'Internal Server Error');
        });;
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
                await UserModel.updateOne(
                  { _id: req.params.session },
                  { [`likedPosts.${searchParam}`]: createdJoy._id }
                );
                res.status(201).json(createdJoy);
              } 
              catch (error) {
                throw createHttpError(500, 'Failed to update the user like');
              }
            } 
            else {
                throw createHttpError(500, 'Failed to create the document');
            }
        })
        .catch((error) => {
            throw createHttpError(500, 'Internal Server Error');
        });
    }
  }
  