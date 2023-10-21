//import { API_URL } from './config';
import { JoyToUpdateType } from '../Types';

export async function patchLike(joyToUpdate: JoyToUpdateType) {
    await fetch(`/api/like`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' //test
        },
        body: JSON.stringify(joyToUpdate),
        credentials: 'include'
    });
}
