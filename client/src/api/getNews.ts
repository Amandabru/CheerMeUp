import { API_URL } from './config';

type NewsCollectionType = {
    offset: number,
    number: number,
    available: number,
    news: NewsType[],
}

type NewsType = {
    id: number,
    title: string,
    text: string,
    summary?: string,
    url: string,
    image: string,
    author: string,
    language: string,
    source_country: string,
    sentiment: number,
};

export async function getHappyNews(): Promise<NewsCollectionType> {
  const response = await fetch(`${API_URL}/news`);
  return response.json();
}
