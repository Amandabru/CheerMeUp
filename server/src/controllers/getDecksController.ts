import { Request, Response } from 'express';
import Deck from '../models/Deck';

export async function getDecksController(req: Request, res: Response) {
  const decks = await Deck.find();
  const api_url = "https://api.worldnewsapi.com/search-news?text=tesla&api-key=d5c93120058d4ee88131ab766649f41c";
  const response = await fetch(api_url);
  const json = await response.json();
  console.log(json);
  res.json(decks);
}
