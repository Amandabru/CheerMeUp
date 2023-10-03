import { API_URL } from './config';

type MemeType = {
    title: string;
    url: string;
};

export async function getMemes(): Promise<[MemeType]> {
    const response = await fetch(`${API_URL}/memes`);
    return response.json();
}
