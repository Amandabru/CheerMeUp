import { Request, Response } from 'express';
import Deck from '../models/Deck';

export async function deleteDeckController(req: Request, res: Response) {
  // Get the deck id from the url
  const deckId = req.params.deckId;
  // Delete the deck from mongo
  const deck = await Deck.findByIdAndDelete(deckId);
  //Return the deleted deck to the user who made the request
  res.json(deck);
}
