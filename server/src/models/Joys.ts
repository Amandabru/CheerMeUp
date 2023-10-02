import { InferSchemaType, Schema, model } from 'mongoose';

const contentSchema = new Schema({
    title: String,
    text: String,
    apiId: Number,
    url: String,
    image: String,
})

const JoySchema = new Schema({
    type: {type: String, required: true},
    likes: {type: Number, required: true},
    lastLiked: {
        type: Date,
        default: () => Date.now(),
    },
    content: contentSchema,

});

type Joy = InferSchemaType<typeof JoySchema>;

export default model<Joy>('Joy', JoySchema);