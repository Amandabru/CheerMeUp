import { API_URL } from './config';

export async function getVerify(userId: string | undefined, uniqueString: string | undefined): Promise<string> {
  const response = await fetch(`${API_URL}/users/verifyUser/${userId}/${uniqueString}`);
  return response.json();
}
