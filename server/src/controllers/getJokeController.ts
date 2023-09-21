import { Request, Response } from 'express';
import fetch from 'node-fetch';

export async function getJokeController(req: Request, res: Response) {
  const api_url = `https://v2.jokeapi.dev/joke/programming?safe-mode&type=single`;
  const response = await fetch(api_url);
  const data = await response.json();
  res.json(data);
}
