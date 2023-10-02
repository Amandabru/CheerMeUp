import { InferSchemaType, Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, select: false },
  password: { type: String, required: true, select: false },
  profilePicture: { type: String, required: false },
  likedPosts: {
    joke: [String],
    suggestion: [String],
    meme: [String],
    news: [String],
  }
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>('User', userSchema);
