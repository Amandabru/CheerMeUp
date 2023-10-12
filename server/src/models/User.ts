import { InferSchemaType, Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, select: false },
    password: { type: String, required: true, select: false },
    profilePicture: { type: String, required: false },
    likedPosts: {
        joke: [
            {
                id: Schema.Types.ObjectId,
                key: Number
            }
        ],
        suggestion: [
            {
                id: Schema.Types.ObjectId,
                key: String
            }
        ],
        meme: [
            {
                id: Schema.Types.ObjectId,
                key: String
            }
        ],
        news: [
            {
                id: Schema.Types.ObjectId,
                key: Number
            }
        ]
    }
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>('User', userSchema);
