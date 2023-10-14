import { API_URL } from './config';
import { ActivityType } from '../Types';

export async function getActivity(
    type: string,
    multipleParticipants: boolean
): Promise<ActivityType> {
    const response = await fetch(
        `${API_URL}/activities/${type}/:${multipleParticipants}`
    );
    return response.json();
}

/*
export function getActivities(type: string, multipleParticipants: boolean) {
    return (
        fetch(`${API_URL}/activities/${type}/:${multipleParticipants}`)
            .then((response) => {
                if (response.ok) {
                    return response;
                } else {
                    throw new Error(response.statusText);
                }
            })
            // from HTTP response headers to HTTP response data
            .then((response) => response.json())
    );
}*/
