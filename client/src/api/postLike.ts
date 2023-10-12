import { API_URL } from './config';
import { SuggestionType, MemeType, NewsType, JokeType } from '../Types';

export async function postLike(
    likedJoy: SuggestionType | MemeType | NewsType | JokeType
) {
    fetch(`${API_URL}/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' //test
        },
        body: JSON.stringify(likedJoy),
        credentials: 'include'
    });
}
