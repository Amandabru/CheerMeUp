//import { API_URL } from './config';
import { DataBaseType } from '../Types';

export async function getPopular(
    number: number,
    sortBy: string
): Promise<DataBaseType[]> {
    const response = await fetch(`/api/popular/${sortBy}/${number}`);
    return response.json();
}
