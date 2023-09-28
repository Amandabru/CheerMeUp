import { InferSchemaType, Schema, model } from 'mongoose';

const contentSchema = new Schema({
    title: String,
    text: {type: String, required: true},
    id: Number,
    url: String,
    image: String,
})

const JoySchema = new Schema({
    type: {type: String, required: true},
    likes: {type: Number, required: true},
    lastLiked: Date,
    content: contentSchema,

});

type Joy = InferSchemaType<typeof JoySchema>;

export default model<Joy>('Joy', JoySchema);