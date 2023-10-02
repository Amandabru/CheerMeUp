import { useForm } from 'react-hook-form';
import { User } from '../../userModel';
import { LoginCredentials } from '../../api/user';
import * as userApi from '../../api/user';
import LoginView from './LoginView';
import { useState } from 'react';
import { UnathorizedError } from '../../errors/httpErrors';

interface LoginPresenterProps {
    onLoginSuccessful: (user: User) => void;
}

const LoginPresenter = ({ onLoginSuccessful }: LoginPresenterProps) => {
    const [errorText, setErrorText] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginCredentials>();

    async function onSubmit(credentials: LoginCredentials) {
        try {
            const user = await userApi.login(credentials);
            onLoginSuccessful(user);
        } catch (error) {
            if (error instanceof UnathorizedError) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            console.error(error);
        }
    }

    return (
        <LoginView
            register={register}
            handleSubmit={handleSubmit(onSubmit)}
            errors={errors}
            errorText={errorText}
            isSubmitting={isSubmitting}
        ></LoginView>
    );
};

export default LoginPresenter;
