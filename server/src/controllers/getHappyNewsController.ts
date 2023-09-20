import { Request, Response } from 'express';
import fetch from 'node-fetch';

export async function getHappyNewsController(req: Request, res: Response) {
    const api_url = "https://api.worldnewsapi.com/search-news?min-sentiment=0.5&earliest-publish-date=2023-09-01&api-key=d5c93120058d4ee88131ab766649f41c";
    const response = await fetch(api_url);
    const json = await response.json();
    res.json(json);

 /*
    const url = 'https://positive-news.p.rapidapi.com/news/health';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8e96945907mshac654d1fb81aa35p1c6843jsncbff7de0556e',
        'X-RapidAPI-Host': 'positive-news.p.rapidapi.com'
      }
    };
    
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      res.json(result);
    } catch (error) {
      console.error(error);
    }*/
  }
