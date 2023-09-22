import { Request, Response } from 'express';
import fetch from 'node-fetch';

export async function getHappyNewsController(req: Request, res: Response) {
  const api_url = `https://api.worldnewsapi.com/search-news?min-sentiment=0.5&earliest-publish-date=2023-09-01&api-key=${process.env.API_KEY_NEWS}`;
  const response = await fetch(api_url);
  const json = await response.json();
  res.json(json);
}
