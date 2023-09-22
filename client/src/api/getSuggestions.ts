import { API_URL } from './config';

type SuggestionType = {
    activity: string,
	accessibility: number,
	type: string,
	participants: number,
	price: number,
}

export async function getHappyNews(): Promise<SuggestionType> {
    const response = await fetch(`${API_URL}/news`);
    return response.json();
  }
  