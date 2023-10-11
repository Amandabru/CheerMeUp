import { API_URL } from './config';
import { JoyToUpdateType } from '../Types';

export async function patchLike(joyToUpdate: JoyToUpdateType): Promise<Response> {
    const response = await fetch(`${API_URL}/like`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({joyToUpdate: joyToUpdate}),
      });
    return response.json();
}
  