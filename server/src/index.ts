import { config } from 'dotenv';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { getHappyNewsController } from './controllers/getHappyNewsController';
import { getMemesController } from './controllers/getMemesController';
import { getJokeController } from './controllers/getJokeController';
import { getSuggestionsController } from './controllers/getSuggestionsController';
import * as UserController from './controllers/userController';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { requiresAuth } from './middleware/auth'; //to be used at endpoints that need authentication

config();

const PORT = 5000;

const app = express();

app.use(
  cors({
    origin: '*',
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL!,
    }),
  })
);

//CheerMeUp
app.get('/news', getHappyNewsController);
app.get('/memes', getMemesController);
app.get('/jokes/:categories', getJokeController);
app.get('/suggestions/:type/:multipleParticipants', getSuggestionsController);
app.post('/users/signup', UserController.signUp);
app.post('/users/login', UserController.login);
app.get('/users', UserController.getAuthenticatedUser);
app.post('/users/logout', UserController.logout);

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
