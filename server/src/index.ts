import { config } from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { getMemesController } from './controllers/getMemesController';
import { getJokeController } from './controllers/getJokeController';
import { getActivityController } from './controllers/getActivityController';
import { postLikeController } from './controllers/postLikeController';
import * as UserController from './controllers/userController';
import { getPopularController } from './controllers/getPopularController2';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import createHttpError, { isHttpError } from 'http-errors';
import { requiresAuth } from './middleware/auth'; //to be used at endpoints that need authentication
import { getJoyController } from './controllers/getJoyController';
import { patchLikeController } from './controllers/patchLikeController';
import { getNewsController } from './controllers/getNewsController';

config();

const PORT = 5000;

const app = express();

app.use(
    cors({
        origin: true,
        credentials: true,
        optionsSuccessStatus: 200
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
app.get('/news', getNewsController);
app.get('/memes', getMemesController);
app.get('/jokes/:categories', getJokeController);
app.get('/activities/:type/:multipleParticipants', getActivityController);

app.get('/joyExists/:type/:searchParam/:searchParamValue', getJoyController);
app.patch('/like', requiresAuth, patchLikeController);
app.post('/like', requiresAuth, postLikeController);
app.get('/popular/:sortBy/:number', getPopularController);

app.get('/users', UserController.getAuthenticatedUser);
app.post('/users/signup', UserController.signUp);
app.get('/users/verifyUser/:userId/:uniqueString', UserController.getVerifiedUser);
app.get('/users/verifiedPage', UserController.getVerifiedPage);
app.post('/users/login', UserController.login);
app.post('/users/logout', requiresAuth, UserController.logout);
app.get('/users/likedJoys', requiresAuth, UserController.getLikedJoys);

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

if(process.env.MONGODB == "local"){
    mongoose.connect(process.env.MONGO_LOCAL_URL!).then(() => {
        console.log("Connected to local database");
        console.log(`listening on port ${PORT}`);
        app.listen(PORT);
    });
}
else{
    mongoose.connect(process.env.MONGO_URL!).then(() => {
        console.log("Connected to external database");
        console.log(`listening on port ${PORT}`);
        app.listen(PORT);
    });
}

