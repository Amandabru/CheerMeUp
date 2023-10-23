import { patchLike } from './api/patchLike';
import { getJoy } from './api/getJoy';
import { postLike } from './api/postLike';
import { JoyToUpdateType, MemeType, JokeType, NewsType } from './Types';
import { CheerModel } from './models/model';

export function updateServerWithModel(model: CheerModel) {
    model.addObserver(async function () {
        try {
            const currentJoy = model.getCurrentJoy();
            if (currentJoy?.type === 'meme') {
                const encodedUrl = encodeURIComponent(
                    (currentJoy as MemeType).url
                );
                const meme = await getJoy('url', encodedUrl, 'meme');
                if (meme.exists) {
                    const memeToUpdate: JoyToUpdateType = {
                        id: meme.id,
                        type: 'meme',
                        searchParamValue: (currentJoy as MemeType).url
                    };
                    patchLike(memeToUpdate);
                } else {
                    postLike(currentJoy as MemeType);
                }
                model.resetCurrentJoy();
            } else if (currentJoy?.type === 'joke') {
                const joke = await getJoy(
                    'apiId',
                    (currentJoy as JokeType).apiId,
                    'joke'
                );
                if (joke.exists) {
                    const jokeToUpdate: JoyToUpdateType = {
                        id: joke.id,
                        type: 'joke',
                        searchParamValue: (currentJoy as JokeType).apiId
                    };
                    patchLike(jokeToUpdate);
                } else {
                    postLike(currentJoy as JokeType);
                }
            } else if (currentJoy?.type === 'news') {
                const encodedUrl = encodeURIComponent(
                    (currentJoy as NewsType).url
                );
                const news = await getJoy('url', encodedUrl, 'news');
                if (news.exists) {
                    const newsToUpdate: JoyToUpdateType = {
                        id: news.id,
                        type: 'news',
                        searchParamValue: (currentJoy as NewsType).url
                    };
                    patchLike(newsToUpdate);
                } else {
                    postLike(currentJoy as NewsType);
                }
            } else {
                return;
            }
        } catch (error) {
            console.log(error);
        }
    });
}
