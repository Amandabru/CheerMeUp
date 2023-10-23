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
import { requiresAuth } from './middleware/auth';
import { getJoyController } from './controllers/getJoyController';
import { patchLikeController } from './controllers/patchLikeController';
import { getNewsController } from './controllers/getNewsController';

config();

const PORT = 5000;

const app = express();

app.set("trust proxy", 1);

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
        name: 'cheerMeUpCookie',
        cookie: {
            secure: false, 
            sameSite: 'lax', 
            httpOnly: true,
            maxAge: 60 * 60 * 1000
        },
        rolling: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL!
        })
    })
);


//CheerMeUp end-points
app.get('/api/news', getNewsController);
app.get('/api/memes', getMemesController);
app.get('/api/jokes/:categories', getJokeController);
app.get('/api/activities/:type', getActivityController);

app.get('/api/joyExists/:type/:searchParam/:searchParamValue', getJoyController);
app.patch('/api/like', requiresAuth, patchLikeController);
app.post('/api/like', requiresAuth, postLikeController);
app.get('/api/popular/:sortBy/:number', getPopularController);

app.get('/api/users', UserController.getAuthenticatedUser);
app.post('/api/users/signup', UserController.signUp);
app.get(
    '/api/users/verifyUser/:userId/:uniqueString',
    UserController.getVerifiedUser
);
app.get('/api/users/verifiedPage', UserController.getVerifiedPage);
app.post('/api/users/login', UserController.login);
app.post('/api/users/logout', requiresAuth, UserController.logout);
app.get('/api/users/likedJoys', requiresAuth, UserController.getLikedJoys);

// Unexisting endpoint
//app.use((_req, _res, next) => {
//  next(createHttpError(404, 'Endpoint not found'));
//});

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

if (process.env.MONGODB == 'local') {
    mongoose.connect(process.env.MONGO_LOCAL_URL!).then(() => {
        console.log('Connected to local database');
        console.log(`listening on port ${PORT}`);
        app.listen(PORT);
    });
} else {
    mongoose.connect(process.env.MONGO_URL!).then(() => {
        console.log('Connected to external database');
        console.log(`listening on port ${PORT}`);
        app.listen(PORT);
    });
}
