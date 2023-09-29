import { API_URL } from './config';

type SuggestionType = {
    activity: string,
}

export async function getHappyNews(): Promise<SuggestionType> {
    const response = await fetch(`${API_URL}/news`);
    return response.json();
  }
  