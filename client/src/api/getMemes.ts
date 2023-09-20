import { API_URL } from './config';

type MemesCollectionType = {
  count: number;
  memes: MemeType[];
};

type MemeType = {
  postLink: string;
  subreddit: string;
  title: string;
  url: string;
  nsfw: boolean;
  spoiler: boolean;
  author: string;
  ups: number;
  preview: string[];
};

export async function getMemes(): Promise<MemesCollectionType> {
  const response = await fetch(`${API_URL}/memes`);
  return response.json();
}
