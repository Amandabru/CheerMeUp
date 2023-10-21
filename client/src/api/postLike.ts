//import { API_URL } from './config';
import { ActivityType, MemeType, NewsType, JokeType } from '../Types';

export async function postLike(
    likedJoy: ActivityType | MemeType | NewsType | JokeType
) {
    fetch(`/api/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' //test
        },
        body: JSON.stringify(likedJoy),
        credentials: 'include'
    });
}
