import { API_URL } from './config';
import { MemesCollectionType } from '../Types';
export async function getMemes(): Promise<MemesCollectionType> {
  const response = await fetch(`${API_URL}/memes`);
  return response.json();
}
