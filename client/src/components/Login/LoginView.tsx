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
}

const LoginView = ({
    register,
    handleSubmit,
    errors,
    errorText,
    isSubmitting
}: LoginViewProps) => {
    return (
        <dialog id="login_modal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <h3 className="font-bold text-lg">Log In</h3>
                {errorText && <div>{errorText}</div>}
                <Form onSubmit={handleSubmit}>
                    <TextInputField
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{ required: 'Required' }}
                        errors={errors.username}
                    ></TextInputField>
                    <TextInputField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{ required: 'Required' }}
                        errors={errors.password}
                    ></TextInputField>
                    <button
                        className="btn btn-secondary"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Log In
                    </button>
                </Form>
            </div>
        </dialog>
    );
};

export default LoginView;
