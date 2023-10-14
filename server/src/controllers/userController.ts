import { RequestHandler } from 'express';
import UserModel from '../models/User';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import * as EmailValidator from 'email-validator';
import { assertIsDefined } from '../utils/assertIsDefined';
import JoyModel from '../models/Joys';
import validate from 'deep-email-validator';
import { DataStructure } from '../../../client/src/Types';

async function isEmailValid(email: string) {
    return validate(email);
}

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.session.userId)
            .select('+email')
            .exec();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

interface SignUpBody {
    usernameSignup?: string;
    email?: string;
    passwordSignup?: string;
}

export const signUp: RequestHandler<
    unknown,
    unknown,
    SignUpBody,
    unknown
> = async (req, res, next) => {
    const username = req.body.usernameSignup;
    const email = req.body.email;
    const passwordRaw = req.body.passwordSignup;

    try {
        if (!username || !email || !passwordRaw) {
            throw createHttpError(400, 'Parameters missing');
        }
        const existingUsername = await UserModel.findOne({
            username: username
        }).exec();
        if (existingUsername) {
            throw createHttpError(
                409,
                'Username already taken. Please choose a different one.'
            );
        }
        const { valid, reason } = await isEmailValid(email);
        if (!valid) {
            throw createHttpError(400, `Invalid email. Reason: ${reason}`);
        }
        const existingEmail = await UserModel.findOne({ email: email }).exec();
        if (existingEmail) {
            throw createHttpError(
                409,
                'A user with this email adress already exists'
            );
        }
        const passwordHashed = await bcrypt.hash(passwordRaw, 10);
        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHashed
        });
        req.session.userId = newUser._id;
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

interface LoginBody {
    usernameLogin?: string;
    passwordLogin?: string;
}

export const login: RequestHandler<
    unknown,
    unknown,
    LoginBody,
    unknown
> = async (req, res, next) => {
    const username = req.body.usernameLogin;
    const password = req.body.passwordLogin;
    try {
        if (!username || !password) {
            throw createHttpError(400, 'Parameters missing');
        }
        const user = await UserModel.findOne({ username: username })
            .select('+password +email')
            .exec();
        if (!user) {
            throw createHttpError(401, 'Invalid credentials');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw createHttpError(401, 'Invalid credentials');
        }

        req.session.userId = user._id;
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy((error) => {
        if (error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    });
};

export const getLikedJoys: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);
        const user = await UserModel.findOne({
            _id: authenticatedUserId
        }).exec();
        let likedMemes = await Promise.all(
            (user?.likedPosts?.meme || []).map(async (joy) => {
                const meme = await JoyModel.findOne({ _id: joy.id }).exec();
                return meme ? meme.content : null;
            })
        );
        likedMemes = likedMemes.filter((meme) => meme !== null);

        let likedJokes = await Promise.all(
            (user?.likedPosts?.joke || []).map(async (joy) => {
                const meme = await JoyModel.findOne({ _id: joy.id }).exec();
                return meme ? meme.content : null;
            })
        );

        likedJokes = likedJokes.filter((joke) => joke !== null);

        let likedNews = await Promise.all(
            (user?.likedPosts?.news || []).map(async (joy) => {
                const meme = await JoyModel.findOne({ _id: joy.id }).exec();
                return meme ? meme.content : null;
            })
        );
        likedNews = likedNews.filter((news) => news !== null);

        const likedJoys = {
            memes: likedMemes,
            jokes: likedJokes,
            news: likedNews
        };
        res.status(200).json(likedJoys);
    } catch (error) {
        next(error);
    }
};
