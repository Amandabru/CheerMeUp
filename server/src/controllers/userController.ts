import { RequestHandler } from 'express';
import UserModel from '../models/User';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import * as EmailValidator from 'email-validator';
import { assertIsDefined } from '../utils/assertIsDefined';
import JoyModel from '../models/Joys';

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
    username?: string;
    email?: string;
    password?: string;
}

export const signUp: RequestHandler<
    unknown,
    unknown,
    SignUpBody,
    unknown
> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;

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
        const validatedEmail = EmailValidator.validate(email);
        if (!validatedEmail) {
            throw createHttpError(400, 'Invalid e-mail');
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
    username?: string;
    password?: string;
}

export const login: RequestHandler<
    unknown,
    unknown,
    LoginBody,
    unknown
> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
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
        const likedMemes = await Promise.all(
            (user?.likedPosts?.meme || []).map(async (joyId) => {
                const meme = await JoyModel.findOne({ _id: joyId }).exec();
                return meme ? meme.content : null;
            })
        );

        const likedJokes = await Promise.all(
            (user?.likedPosts?.joke || []).map(async (joyId) => {
                const meme = await JoyModel.findOne({ _id: joyId }).exec();
                return meme ? meme.content : null;
            })
        );

        const likedNews = await Promise.all(
            (user?.likedPosts?.news || []).map(async (joyId) => {
                const meme = await JoyModel.findOne({ _id: joyId }).exec();
                return meme ? meme.content : null;
            })
        );

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
