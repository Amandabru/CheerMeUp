import { API_URL } from './config';
import { DataBaseType } from '../Types';

export async function getMostLiked(number: number): Promise<DataBaseType[]> {
    const response = await fetch(`${API_URL}/mostLiked/${number}`);
    return response.json();
}
