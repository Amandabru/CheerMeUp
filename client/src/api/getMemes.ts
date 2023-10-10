/*
------------------
original code

import { API_URL } from './config';
import { MemeType } from '../Types';

export async function getMemes(): Promise<MemeType[]> {
    const response = await fetch(`${API_URL}/memes`);
    return response.json();
} 
---------------------------
This version resolves the first fetch thing by forcing a fetch or something, does not resolve internal sever error though


import { API_URL } from './config';
import { MemeType } from '../Types';

export async function getMemes(): Promise<MemeType[]> {
    // Generate a random string to append as a query parameter
    const cacheBuster = Math.random().toString(36).substring(7);

    // Append the cache buster as a query parameter to the URL
    const urlWithCacheBuster = `${API_URL}/memes?cacheBuster=${cacheBuster}`;

    const response = await fetch(urlWithCacheBuster);
    return response.json();
}*/

import { API_URL } from './config';
import { MemeType } from '../Types';

// Define a type for the custom fetch function
type CustomFetch = (url: string, options?: RequestInit) => Promise<MemeType[]>;

const createFetch = (): CustomFetch => {
    // Create a cache of fetches by URL
    const fetchMap: { [key: string]: Promise<MemeType[]> } = {};

    return async (url: string, options?: RequestInit) => {
        // Generate a unique key for this request based on the URL and options
        const cacheKey = url + JSON.stringify(options || {});

        // Check if the response is already cached
        if (await fetchMap[cacheKey]) {
            return fetchMap[cacheKey];
        }

        // If not cached, fetch the data and store the promise in the cache
        const fetchPromise = fetch(url, options)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .catch((error) => {
                delete fetchMap[cacheKey]; // Remove from cache if there was an error
                throw error;
            });

        fetchMap[cacheKey] = fetchPromise;
        return fetchPromise;
    };
};

const customFetch: CustomFetch = createFetch();

export async function getMemes(): Promise<MemeType[]> {
    const response = await customFetch(`${API_URL}/memes`);
    return response;
}
