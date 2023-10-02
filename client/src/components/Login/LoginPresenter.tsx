import { useForm } from 'react-hook-form';
import { User } from '../../userModel';
import { LoginCredentials } from '../../api/user';
import * as userApi from '../../api/user';
import LoginView from './LoginView';

interface LoginPresenterProps {
    onLoginSuccessful: (user: User) => void;
}

const LoginPresenter = ({ onLoginSuccessful }: LoginPresenterProps) => {
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
            alert(error);
            console.error(error);
        }
    }

    return (
        <LoginView
            register={register}
            handleSubmit={handleSubmit(onSubmit)}
            errors={errors}
            isSubmitting={isSubmitting}
        ></LoginView>
    );
};

export default LoginPresenter;
