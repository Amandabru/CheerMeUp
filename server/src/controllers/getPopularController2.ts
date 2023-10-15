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
                const transformedList = topList.map((item) => {
                    switch (item.type) {
                        case 'meme':
                            item.content = {
                                title: item.content.title,
                                url: item.content.url
                            };
                            break;
                        case 'joke':
                            item.content = {
                                text: item.content.text,
                                apiId: item.content.apiId
                            };
                            break;
                        case 'news':
                            item.content = {
                                source: item.content.source,
                                author: item.content.author,
                                title: item.content.title,
                                text: item.content.text,
                                url: item.content.url,
                                urlToImage: item.content.urlToImage,
                                publishedAt: item.content.publishedAt
                            };
                            break;
                    }
                    return item;
                });

                res.status(200).json(transformedList);
            } else {
                throw createHttpError(500, 'Could not get toplist');
            }
        })
        .catch((error) => {
            next(error);
        });
}
