import { fetchData } from './fetchData';
import { API_URL } from './config';
import { User } from '../userModel.ts';
import { DataBaseType, JokeType, MemeType, NewsType } from '../Types.ts';

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData(`${API_URL}/users`, {
        method: 'GET',
        credentials: 'include'
    });
    return response.json();
}

export interface SignUpCredentials {
    username: string;
    email: string;
    password: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData(`${API_URL}/users/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials),
        credentials: 'include'
    });
    return response.json();
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
    const response = await fetchData(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials),
        credentials: 'include'
    });
    return response.json();
}

export async function logout() {
    await fetchData(`${API_URL}/users/logout`, {
        method: 'POST',
        credentials: 'include'
    });
}

export async function getLikedJoys(): Promise<
    DataBaseType[] | JokeType[] | MemeType[] | NewsType[]
> {
    const response = await fetchData(`${API_URL}/users/likedJoys`, {
        method: 'GET',
        credentials: 'include'
    });
    return response.json();
}
