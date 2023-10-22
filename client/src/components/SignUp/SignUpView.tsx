import { Form } from 'react-bootstrap';
import TextInputField from '../UI/TextInputField';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SignUpCredentials, LoginCredentials } from '../../api/user';

interface SignUpViewProps {
    register: UseFormRegister<SignUpCredentials | LoginCredentials>;
    handleSubmit: () => void;
    errors: FieldErrors<SignUpCredentials>;
    errorText: string | null;
    isSubmitting: boolean;
    directToLogin: Function;
}

const SignUpView = ({
    register,
    handleSubmit,
    errors,
    errorText,
    isSubmitting,
    directToLogin
}: SignUpViewProps) => {
    return (
        <dialog id="signup_modal" className="modal">
            <div className="modal-box w-80">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <h3 className="font-bold text-2xl mb-3 text-center">Sign Up</h3>
                <p>{errorText}</p>
                <Form onSubmit={handleSubmit}>
                    <TextInputField
                        id="SignupUsername"
                        name="username"
                        label="Username"
                        type="text"
                        placeholder="Username"
                        register={register}
                        registerOptions={{ required: 'Required' }}
                        error={errors.username}
                    />
                    <TextInputField
                        id="SignupEmail"
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        register={register}
                        registerOptions={{ required: 'Required' }}
                        error={errors.email}
                    />
                    <TextInputField
                        id="SignupPassword"
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        register={register}
                        registerOptions={{ required: 'Required' }}
                        error={errors.password}
                    />
                    <button
                        className={
                            isSubmitting
                                ? 'invisible'
                                : 'btn btn-secondary mt-2 w-full visible'
                        }
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Sign Up
                    </button>
                    <span
                        className={
                            isSubmitting
                                ? 'loading loading-dots loading-md'
                                : 'invisible'
                        }
                    ></span>
                    <div className="text-sm mt-2">
                        {' '}
                        Already have an account?{' '}
                        <a
                            className="text-decoration-line: underline cursor-pointer"
                            onClick={() => directToLogin()}
                        >
                            {' '}
                            Login{' '}
                        </a>
                    </div>
                </Form>
            </div>
        </dialog>
    );
};

export default SignUpView;
