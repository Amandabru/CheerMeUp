import { API_URL } from './config';
import { NewsType } from '../Types';

export async function getHappyNews(): Promise<NewsType[]> {
  const response = await fetch(`${API_URL}/api/news`);
  return response.json();
}
