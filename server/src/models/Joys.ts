import { InferSchemaType, Schema, model } from 'mongoose';

const contentSchema = new Schema({
    title: String,
    text: String,
    apiId: Number,
    url: String,
    source: String,
    author: String,
    urlToImage: String,
    publishedAt: String
});

const JoySchema = new Schema({
    type: { type: String, required: true },
    likes: { type: Number, required: true },
    lastLiked: {
        type: Date,
        default: () => Date.now()
    },
    content: { type: contentSchema, required: true }
});

type Joy = InferSchemaType<typeof JoySchema>;

export default model<Joy>('Joy', JoySchema);
