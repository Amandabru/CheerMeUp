import { Form } from 'react-bootstrap';
import TextInputField from '../UI/TextInputField';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import * as userApi from '../../api/user';

interface SignUpViewProps {
    register: UseFormRegister<userApi.SignUpCredentials>;
    handleSubmit: () => void;
    errors: FieldErrors<userApi.SignUpCredentials>;
    errorText: string | null;
    isSubmitting: boolean;
}

const SignUpView = ({
    register,
    handleSubmit,
    errors,
    errorText,
    isSubmitting
}: SignUpViewProps) => {
    return (
        <dialog id="signup_modal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <h3 className="font-bold text-lg">Sign Up</h3>
                <p>{errorText}</p>
                <Form onSubmit={handleSubmit}>
                    <TextInputField
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{ required: 'Required' }}
                        error={errors.username}
                    />
                    <TextInputField
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        register={register}
                        registerOptions={{ required: 'Required' }}
                        error={errors.email}
                    />
                    <TextInputField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{ required: 'Required' }}
                        error={errors.password}
                    />
                    <button
                        className="btn btn-secondary"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Sign Up
                    </button>
                </Form>
            </div>
        </dialog>
    );
};

export default SignUpView;
