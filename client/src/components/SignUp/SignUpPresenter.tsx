import { User } from '../../userModel';
import { useForm } from 'react-hook-form';
import * as userApi from '../../api/user';
import { SignUpCredentials } from '../../api/user';
import SignUpView from './SignUpView';

interface SignUpPresenterProps {
    onSignUpSuccessful: (user: User) => void;
}

const SignUpPresenter = ({ onSignUpSuccessful }: SignUpPresenterProps) => {
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
            alert(error);
            console.error(error);
        }
    }

    return (
        <SignUpView
            register={register}
            handleSubmit={handleSubmit(onSubmit)}
            isSubmitting={isSubmitting}
            errors={errors}
        ></SignUpView>
    );
};

export default SignUpPresenter;
