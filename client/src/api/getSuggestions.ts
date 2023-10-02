import { API_URL } from './config';

type SuggestionType = {
    type: string,
    text: string,
}

export async function getHappyNews(): Promise<SuggestionType> {
    const response = await fetch(`${API_URL}/news`);
    return response.json();
  }
  