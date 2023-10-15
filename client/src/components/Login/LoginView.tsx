import { LoginCredentials } from '../../api/user';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import TextInputField from '../UI/TextInputField';

interface LoginViewProps {
    register: UseFormRegister<LoginCredentials>;
    handleSubmit: () => void;
    errors: FieldErrors<LoginCredentials>;
    errorText: string | null;
    isSubmitting: boolean;
    directToSignup: Function;
}

const LoginView = ({
    register,
    handleSubmit,
    errors,
    errorText,
    isSubmitting,
    directToSignup
}: LoginViewProps) => {
    return (
        <dialog id="login_modal" className="modal">
            <div className="modal-box w-80">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <h3 className="font-bold text-2xl mb-3 text-center">Log In</h3>
                {errorText && <div>{errorText}</div>}
                <Form onSubmit={handleSubmit}>
                    <TextInputField
                        id="LoginUsername"
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{ required: 'Required' }}
                        errors={errors.username}
                    ></TextInputField>
                    <TextInputField
                        id="LoginPassword"
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{ required: 'Required' }}
                        errors={errors.password}
                    ></TextInputField>
                    <button
                        className="btn btn-primary mt-2 w-full"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Log In
                    </button>
                    <div className="text-sm mt-2">
                        {' '}
                        Don't have an account?{' '}
                        <a
                            className="text-decoration-line: underline cursor-pointer"
                            onClick={() => directToSignup()}
                        >
                            {' '}
                            Signup{' '}
                        </a>
                    </div>
                </Form>
            </div>
        </dialog>
    );
};

export default LoginView;
