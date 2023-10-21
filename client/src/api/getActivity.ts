//import { API_URL } from './config';
import { ActivityType } from '../Types';

export async function getActivity(
    type: string,
): Promise<ActivityType> {
    const response = await fetch(
        `/api/activities/${type}`
    );
    return response.json();
}
