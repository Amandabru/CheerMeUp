import { InferSchemaType, Schema, model } from 'mongoose';

const contentSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    apiId: { type: Number, required: true },
    url: { type: String, required: true },
    source: { type: String, required: true },
    author: { type: String, required: true },
    urlToImage: { type: String, required: true },
    publishedAt: { type: String, required: true }
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
