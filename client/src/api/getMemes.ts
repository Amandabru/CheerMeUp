//import { API_URL } from './config';
import { MemeType } from '../Types';

export async function getMemes(): Promise<MemeType[]> {
    const response = await fetch(`/api/memes`);
    return response.json();
}
