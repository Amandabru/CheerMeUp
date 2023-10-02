import { API_URL } from './config';

type MemesCollectionType = {
  count: number;
  memes: MemeType[];
};

type MemeType = {
  type: string,
  title: string;
  url: string;
  preview: string[];
};

export async function getMemes(): Promise<MemesCollectionType> {
  const response = await fetch(`${API_URL}/memes`);
  return response.json();
}
