import { API_URL } from './config';

type NewsType = {
    apiId: number,
    title: string,
    text: string,
    url: string,
    image: string,
    author: string,
};

export async function getHappyNews(): Promise<NewsType[]> {
  const response = await fetch(`${API_URL}/news`);
  return response.json();
}
