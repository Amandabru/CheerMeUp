import { API_URL } from './config';

type JokeType = {
  type: string,
  text: string;
  apiId: number;
};

export async function getJoke(categories: string[]): Promise<JokeType> {
  const response = await fetch(`${API_URL}/jokes/${categories.join(',')}`);
  return response.json();
}
