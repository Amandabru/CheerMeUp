import { config } from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { getHappyNewsController } from './controllers/getHappyNewsController';
import { getMemesController } from './controllers/getMemesController';
import { getJokeController } from './controllers/getJokeController';
import { getSuggestionsController } from './controllers/getSuggestionsController';
import { postLikeController } from './controllers/postLikeController';
import { getLikedJoys } from './controllers/getLikedJoys';
import * as UserController from './controllers/userController';
import { getMostLikedController } from './controllers/getMostLikedController';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import createHttpError, { isHttpError } from 'http-errors';
import { requiresAuth } from './middleware/auth'; //to be used at endpoints that need authentication

config();

const PORT = 5000;

const app = express();

app.use(
    cors({
        origin: '*'
    })
);

app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 1000
        },
        rolling: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL!
        })
    })
);

//CheerMeUp end-points
app.get('/news', getHappyNewsController);
app.get('/memes', getMemesController);
app.get('/jokes/:categories', getJokeController);
app.get('/suggestions/:type/:multipleParticipants', getSuggestionsController);
app.post('/like', requiresAuth, postLikeController);
//har det blivit fel här nedan? SKa väl va get?
app.post('/mostLiked/:number', getMostLikedController);
app.get('/users', requiresAuth, UserController.getAuthenticatedUser);
app.post('/users/signup', UserController.signUp);
app.post('/users/login', UserController.login);
app.post('/users/logout', requiresAuth, UserController.logout);
app.get('/users/likedJoys', requiresAuth, getLikedJoys);

// Unexisting endpoint
app.use((_req, _res, next) => {
    next(createHttpError(404, 'Endpoint not found'));
});

// Any error
app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.error(error);
    let errorMessage = 'An unknown error occurred';
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
});
