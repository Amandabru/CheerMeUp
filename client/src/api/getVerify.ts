//import { API_URL } from './config';
import { MessageType } from '../Types';

export async function getVerify(userId: string | undefined, uniqueString: string | undefined): Promise<MessageType> {
  const response = await fetch(`/api/users/verifyUser/${userId}/${uniqueString}`);
  return response.json();
}
