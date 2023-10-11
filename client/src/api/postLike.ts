import { API_URL } from './config';
import { SuggestionType, MemeType, NewsType, JokeType } from '../Types';

export async function postLike(likedJoy: SuggestionType | MemeType | NewsType | JokeType): Promise<Response> {
    const response = await fetch(`${API_URL}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({likedJoy: likedJoy}),
      });
    return response.json();
}
  