import { NextFunction, Request, Response } from 'express';
import JoyModel from '../models/Joys';
import UserModel from '../models/User';
import createHttpError from 'http-errors';

// CHECK: possible bug when you try to like when you just have recently signed up as user - might get error unautharized
export async function postLikeController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const likedJoy = req.body;
    const type = likedJoy.type;

    let searchParamValue: number | string;

    if (type == 'joke') {
        searchParamValue = likedJoy.apiId;
    } else if (type == 'meme' || type == 'news') {
        searchParamValue = likedJoy.url;
    } else {
        searchParamValue = likedJoy.text;
    }

    // const searchParam = Object.keys(likedJoy).find(key => likedJoy[key] === searchParamValue);

    await JoyModel.create({
        type: type,
        likes: 1,
        content: {
            title: likedJoy.hasOwnProperty('title') ? likedJoy.title : '',
            text: likedJoy.hasOwnProperty('text') ? likedJoy.text : '',
            apiId: likedJoy.hasOwnProperty('apiId') ? likedJoy.apiId : 0,
            url: likedJoy.hasOwnProperty('url') ? likedJoy.url : '',
            source: likedJoy.hasOwnProperty('source') ? likedJoy.source : '',
            author: likedJoy.hasOwnProperty('author') ? likedJoy.author : '',
            urlToImage: likedJoy.hasOwnProperty('urlToImage')
                ? likedJoy.urlToImage
                : '',
            publishedAt: likedJoy.hasOwnProperty('publishedAt')
                ? likedJoy.publishedAt
                : ''
        }
    })
        .then(async (createdJoy) => {
            if (createdJoy) {
                try {
                    await UserModel.updateOne(
                        { _id: req.session.userId },
                        {
                            $push: {
                                [`likedPosts.${type}`]: {
                                    id: createdJoy._id,
                                    key: searchParamValue
                                }
                            }
                        }
                    ).exec();
                    res.status(201).end();
                } catch (error) {
                    next(error);
                }
            } else {
                throw createHttpError(500, 'Failed to create the document');
            }
        })
        .catch((error) => {
            next(error);
        });
}
