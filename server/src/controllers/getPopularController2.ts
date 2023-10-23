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

    try {
        const topList = await JoyModel.find({ likes: { $gt: 0 } })
            .sort(sortBy === 'likes' ? { likes: -1 } : { lastLiked: -1 })
            .limit(number);

        if (topList) {
            const transformedList = topList.map((item) => {
                let transformedItem = {};
                if (item.type === 'meme') {
                    const { title, url } = item.content;
                    transformedItem = {
                        id: item._id.toString(),
                        type: item.type,
                        likes: item.likes,
                        content: { type: item.type, title, url },
                        lastLiked: item.lastLiked
                    };
                } else if (item.type === 'joke') {
                    const { text, apiId } = item.content;
                    transformedItem = {
                        id: item._id.toString(),
                        type: item.type,
                        likes: item.likes,
                        content: { type: item.type, text, apiId },
                        lastLiked: item.lastLiked
                    };
                } else if (item.type === 'news') {
                    const {
                        source,
                        author,
                        title,
                        text,
                        url,
                        urlToImage,
                        publishedAt
                    } = item.content;
                    transformedItem = {
                        id: item._id.toString(),
                        type: item.type,
                        likes: item.likes,
                        content: {
                            type: item.type,
                            source,
                            author,
                            title,
                            text,
                            url,
                            urlToImage,
                            publishedAt
                        },
                        lastLiked: item.lastLiked
                    };
                }

                return transformedItem;
            });

            res.status(200).json(transformedList);
        } else {
            throw createHttpError(500, 'Could not get toplist');
        }
    } catch (error) {
        next(error);
    }
}
