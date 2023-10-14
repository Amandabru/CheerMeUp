import { RequestHandler, Request, Response } from 'express';
import UserModel from '../models/User';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { assertIsDefined } from '../utils/assertIsDefined';
import JoyModel from '../models/Joys';
import { DataStructure } from '../../../client/src/Types';
import { uuid } from 'uuidv4';
import UserVerification from '../models/UserVerification';
import nodemailer from 'nodemailer';
import path from 'path';

interface SignUpBody {
    username?: string;
    email?: string;
    password?: string;
}

// Nodemailer
let transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    }
})

// transporter.verify((error: Error | null) => {
//     if(error)
//         console.log(error)
//     else{
//         console.log("Ready to send messages")
//     }
// })

// fix any
async function sendVerificationEmail(result: any, res: any){
   const url = process.env.URL;
   const uniqueString = uuid() + result._id;

   const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: result.email,
    subject: "Verify Your Email",
    html: `<p>Verify your email address to complete the signup.</p>
    <p>Press <a href=${url + "user/verify/" + result._id + "/" + uniqueString } > here </a> to proceed </p>`,
   }

   bcrypt
   .hash(uniqueString, 10)
   .then(async (hashedUniqueString) => {
        const newVerification = await UserVerification.create({
            userId: result._id,
            uniqueString: hashedUniqueString,
        })

        transporter.sendMail(mailOptions)
        .then(() => {
            // email sent and user verification saved
            res.status(202).json({message: "Verification email sent"});
        })
        .catch(()=>{
            throw createHttpError(500, 'Internal server error');
        })
   })
   .catch(() => {
        throw createHttpError(500, 'Internal server error');
   })
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
    let {userId, uniqueString} = req.params;

    UserVerification.find({userId})
    .then(async (result) => {
        if(result.length > 0){
            const hashedUniqueString = result[0].uniqueString ?? "";
            const correctString = await bcrypt.compare(uniqueString, hashedUniqueString);
            
            if(correctString){
                UserModel.updateOne({_id: userId}, {verified: true})
                .then(() => {
                    UserVerification.deleteOne({userId})
                    .then(() => {
                        res.redirect("users/verifiedPage");
                    })
                    .catch((error) => {
                        next(error);
                    });
                })
                .catch((error) => {
                    next(error);
                });
            }
            else{
                throw createHttpError(
                    400,
                    'Invalid verification details passed.'
                );
            }
        }})

    .catch(() => {
        let message = "An error occured while checking for existing user verification record."
        res.redirect("users/verifiedPage");
    })

};

export const getVerifiedPage: RequestHandler = (req, res) =>
{
    res.sendFile(path.join(__dirname, "./../verifiedView.html"))
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
            verified: false,
        }).then(result => {
            // Handle email verification
            sendVerificationEmail(result, res);
        });


        // req.session.userId = newUser._id;
        // res.status(201).json(newUser);
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

        if(!user.verified){
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
