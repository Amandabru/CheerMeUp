import { assertIsDefined } from '../utils/assertIsDefined';
import JoyModel from '../models/Joys';
import UserModel from '../models/User';
import { RequestHandler } from 'express';

export const getLikedJoys: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);
        const user = await UserModel.findOne({
            _id: authenticatedUserId
        }).exec();
        const likedMemes = await Promise.all(
            (user?.likedPosts?.meme || []).map(async (joyId) => {
                console.log('here2');
                const meme = await JoyModel.findOne({ _id: joyId }).exec();
                console.log(meme);
                return meme ? meme.content : null;
            })
        );

        const likedJokes = await Promise.all(
            (user?.likedPosts?.joke || []).map(async (joyId) => {
                const meme = await JoyModel.findOne({ _id: joyId }).exec();
                return meme ? meme.content : null;
            })
        );

        const likedNews = await Promise.all(
            (user?.likedPosts?.news || []).map(async (joyId) => {
                const meme = await JoyModel.findOne({ _id: joyId }).exec();
                return meme ? meme.content : null;
            })
        );

        const likedJoys = {
            memes: likedMemes,
            jokes: likedJokes,
            news: likedNews
        };
        res.status(200).json(likedJoys);
    } catch (error) {
        next(error);
    }
};
