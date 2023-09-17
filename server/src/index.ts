import { config } from 'dotenv';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Deck from './models/deck';
config();

const PORT = 5000;

const app = express();

app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());

app.get('/decks', async (req: Request, res: Response) => {
  const decks = await Deck.find();
  res.json(decks);
});

app.post('/decks', async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const cretedDeck = await newDeck.save();
  res.json(cretedDeck);
});

app.delete('/decks/:deckId', async (req: Request, res: Response) => {
  // Get the deck id from the url
  const deckId = req.params.deckId;
  // Delete the deck from mongo
  const deck = await Deck.findByIdAndDelete(deckId);
  //Return the deleted deck to the user who made the request
  res.json(deck);
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
