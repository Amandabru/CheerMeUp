import { Request, Response } from 'express';
import fetch from 'node-fetch';

export async function getMemesController(req: Request, res: Response) {
  //get ten random memes. To be specified furhter, depending on the request
  const api_url = 'https://meme-api.com/gimme/10';
  const response = await fetch(api_url);
  const data = await response.json();
  res.json(data);
}
