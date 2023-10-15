import { RequestHandler } from 'express';
import UserModel from '../models/User';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { assertIsDefined } from '../utils/assertIsDefined';
import JoyModel from '../models/Joys';
import { v4 as uuidv4 } from 'uuid';
import UserVerification from '../models/UserVerification';
import nodemailer from 'nodemailer';
import path from 'path';
import * as fs from 'fs';
import { config } from 'dotenv';

config();

// type UserModelType = {
//     username: string,
//     email: string,
//     password: string,
//     verified?: boolean | undefined,
//     profilePicture?: string | undefined;
//     likedPosts?: {
//         joke: {
//             id?: Types.ObjectId | undefined;
//             key?: number | undefined;
//         }[];
//         activity: {
//             id?: Types.ObjectId | undefined;
//             key?: string | undefined;
//         }[];
//         meme: {
//             id?: Types.ObjectId | undefined;
//             key?: string | undefined;
//         }[];
//         news: {
//             id?: Types.ObjectId | undefined;
//             key?: string | undefined;
//         }[];
//     } | undefined;
//     _id: ObjectId,
// }

interface SignUpBody {
    username?: string;
    email?: string;
    password?: string;
}

// Nodemailer
let transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: process.env.AUTH_EMAIL as string,
        pass: process.env.AUTH_PASS as string
    }
});

// TODO: fix any
async function sendVerificationEmail(result: any, res: any) {
    const email = process.env.AUTH_EMAIL;
    const url = process.env.URL;
    const uniqueString = uuidv4() + result._id;

    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: result.email,
        subject: 'Verify Your Email',
        html: `<p>Verify your email address to complete the signup.</p>
    <p>Press <a href=${
        url + 'users/verifyUser/' + result._id + '/' + uniqueString
    } >here</a> to proceed </p>`
    };

    bcrypt
        .hash(uniqueString, 10)
        .then(async (hashedUniqueString) => {
            await UserVerification.create({
                userId: result._id,
                uniqueString: hashedUniqueString
            });

            transporter
                .sendMail(mailOptions)
                .then(() => {
                    // email sent and user verification saved
                    res.status(202).json({
                        message: 'A verification email has been sent to you'
                    });
                })
                .catch(() => {
                    throw createHttpError(500, 'Internal server error');
                });
        })
        .catch(() => {
            throw createHttpError(500, 'Internal server error');
        });
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

export const getVerifiedUser: RequestHandler = async (req, res, next) => {
    let { userId, uniqueString } = req.params;

    UserVerification.find({ userId })
        .then(async (result) => {
            if (result.length > 0) {
                const hashedUniqueString = result[0].uniqueString ?? '';
                const correctString = await bcrypt.compare(
                    uniqueString,
                    hashedUniqueString
                );

                if (correctString) {
                    UserModel.updateOne({ _id: userId }, { verified: true })
                        .then(() => {
                            UserVerification.deleteOne({ userId })
                                .then(() => {
                                    let message =
                                        'You have successfully verified your email. Head back to the website and proceed to login.';
                                    res.redirect(
                                        `/users/verifiedPage?message=${encodeURIComponent(
                                            message
                                        )}`
                                    );
                                })
                                .catch((error) => {
                                    next(error);
                                });
                        })
                        .catch((error) => {
                            next(error);
                        });
                } else {
                    throw createHttpError(
                        400,
                        'Invalid verification details passed.'
                    );
                }
            }
        })

        .catch(() => {
            let message =
                'An error occured while checking for existing user verification record. Please try again.';
            res.redirect(
                `/users/verifiedPage?message=${encodeURIComponent(message)}`
            );
        });
};

export const getVerifiedPage: RequestHandler = (req, res) => {
    const message: any = req.query.message || '';
    const htmlContent = fs.readFileSync(
        path.join(__dirname, '../verifiedView.html'),
        'utf8'
    );
    const updatedHtmlContent = htmlContent.replace(
        '<!-- Message will be displayed here -->',
        message
    );
    res.send(updatedHtmlContent);
};

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
            password: passwordHashed,
            verified: false
        }).then((result) => {
            // Handle email verification
            sendVerificationEmail(result, res);
        });
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

        if (!user.verified) {
            throw createHttpError(401, 'Email address not verified');
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
