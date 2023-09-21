import { config } from 'dotenv';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Deck from './models/Deck';
import { getDecksController } from './controllers/getDecksController';
import { createDeckController } from './controllers/createDeckController';
import { deleteDeckController } from './controllers/deleteDeckController';
import { getDeckController } from './controllers/getDeckController';
import { createCardForDeckController } from './controllers/createCardForDeckController';
import { deleteCardOnDeckController } from './controllers/deleteCardOnDeckController';
import { getHappyNewsController } from './controllers/getHappyNewsController';
import { getMemesController } from './controllers/getMemesController';
import { getJokeController } from './controllers/getJokeController';

config();

const PORT = 5000;

const app = express();

app.use(
  cors({
    origin: '*',
  })
);

app.use(express.json());

//CheerMeUp
app.get('/news', getHappyNewsController);
app.get('/memes', getMemesController);
app.get('/jokes', getJokeController);

// Deck examples
app.get('/decks', getDecksController);
app.post('/decks', createDeckController);
app.delete('/decks/:deckId', deleteDeckController);
app.get('/decks/:deckId', getDeckController);
app.post('/decks/:deckId/cards', createCardForDeckController);
app.delete('/decks/:deckId/cards/:index', deleteCardOnDeckController);

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
