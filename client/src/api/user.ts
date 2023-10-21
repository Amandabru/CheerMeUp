import { fetchData } from './fetchData';
import { API_URL } from './config';
import { User } from '../userModel.ts';
import { DataStructure } from '../Types.ts';

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData(`${API_URL}/api/users`, {
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

export async function signUp(credentials: SignUpCredentials) {
    const response = await fetchData(`${API_URL}/api/users/signup`, {
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
    const response = await fetchData(`${API_URL}/api/users/login`, {
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
    await fetchData(`${API_URL}/api/users/logout`, {
        method: 'POST',
        credentials: 'include'
    });
}

export async function getLikedJoys(): Promise<DataStructure> {
    const response = await fetchData(`${API_URL}/api/users/likedJoys`, {
        method: 'GET',
        credentials: 'include'
    });
    return response.json();
}
