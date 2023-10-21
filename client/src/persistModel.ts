import { patchLike } from './api/patchLike';
import { getJoy } from './api/getJoy';
import { postLike } from './api/postLike';
import { JoyToUpdateType } from './Types';
import { CheerModel } from './models/model';

export function updateServerWithModel(model: CheerModel) {
    model.addObserver(async function () {
        const currentMeme = model.getCurrentMeme();
        if (currentMeme) {
            const encodedUrl = encodeURIComponent(currentMeme.url);
            const meme = await getJoy('url', encodedUrl, 'meme');
            if (meme.exists) {
                const memeToUpdate: JoyToUpdateType = {
                    id: meme.id,
                    type: 'meme',
                    searchParamValue: currentMeme.url
                };
                patchLike(memeToUpdate);
            } else {
                postLike(currentMeme);
            }
            model.resetCurrentMeme();
        } else {
            return;
        }
    });
}
