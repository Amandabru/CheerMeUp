import { User } from '../../userModel';
import { useForm } from 'react-hook-form';
import * as userApi from '../../api/user';
import { SignUpCredentials } from '../../api/user';
import SignUpView from './SignUpView';
import { useState } from 'react';
import { ConflictError } from '../../errors/httpErrors';

interface SignUpPresenterProps {
    onSignUpSuccessful: (user: User) => void;
}

const SignUpPresenter = ({ onSignUpSuccessful }: SignUpPresenterProps) => {
    const [errorText, setErrorText] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SignUpCredentials>();

    async function onSubmit(credentials: SignUpCredentials) {
        try {
            const newUser = await userApi.signUp(credentials);
            onSignUpSuccessful(newUser);
        } catch (error) {
            if (error instanceof ConflictError) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            console.error(error);
        }
    }

    return (
        <SignUpView
            register={register}
            handleSubmit={handleSubmit(onSubmit)}
            errors={errors}
            errorText={errorText}
            isSubmitting={isSubmitting}
        ></SignUpView>
    );
};

export default SignUpPresenter;
