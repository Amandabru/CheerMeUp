import { useForm } from 'react-hook-form';
import * as userApi from '../../api/user';
import { SignUpCredentials } from '../../api/user';
import SignUpView from './SignUpView';
import { useState } from 'react';
import { ConflictError } from '../../errors/httpErrors';

const SignUpPresenter = ({
    directToLogin,
    directToVerification
}: {
    directToLogin: Function;
    directToVerification: Function;
}) => {
    const [errorText, setErrorText] = useState<string | null>(null);
    useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SignUpCredentials>();

    async function onSubmit(credentials: SignUpCredentials) {
        try {
            await userApi.signUp(credentials);
            directToVerification();
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
            directToLogin={directToLogin}
        ></SignUpView>
    );
};

export default SignUpPresenter;
