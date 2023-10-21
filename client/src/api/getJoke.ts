//import { API_URL } from './config';
import { JokeType } from '../Types';

export async function getJoke(categories: string[]): Promise<JokeType> {
    const response = await fetch(`/api/jokes/${categories.join(',')}`);
    return response.json();
}
