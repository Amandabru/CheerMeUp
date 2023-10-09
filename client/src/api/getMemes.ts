/*import { API_URL } from './config';
import { MemeType } from '../Types';

export async function getMemes(): Promise<MemeType[]> {
    const response = await fetch(`${API_URL}/memes`);
    return response.json();
}*/
import { API_URL } from './config';
import { MemeType } from '../Types';

export async function getMemes(): Promise<MemeType[]> {
    // Generate a random string to append as a query parameter
    const cacheBuster = Math.random().toString(36).substring(7);

    // Append the cache buster as a query parameter to the URL
    const urlWithCacheBuster = `${API_URL}/memes?cacheBuster=${cacheBuster}`;

    const response = await fetch(urlWithCacheBuster);
    return response.json();
}
