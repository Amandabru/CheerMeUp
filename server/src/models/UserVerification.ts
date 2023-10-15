import { InferSchemaType, Schema, model } from 'mongoose';

const userVerificationSchema = new Schema({
    userId: String,
    uniqueString: String,
});

type UserVerification = InferSchemaType<typeof userVerificationSchema>;

export default model<UserVerification>('UserVerification', userVerificationSchema);