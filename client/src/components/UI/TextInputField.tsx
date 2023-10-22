import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { LoginCredentials, SignUpCredentials } from '../../api/user';

interface TextInputFieldProps {
    id: string;
    name: 'email' | 'username' | 'password';
    label: string;
    register: UseFormRegister<LoginCredentials | SignUpCredentials>;
    registerOptions?: RegisterOptions;
    error?: FieldError;
    [x: string]:
        | string
        | UseFormRegister<LoginCredentials | SignUpCredentials>
        | RegisterOptions
        | FieldError
        | undefined;
}

const TextInputField = ({
    id,
    name,
    label,
    register,
    registerOptions,
    error,
    ...props
}: TextInputFieldProps) => {
    return (
        <Form.Group className="mb-3 mt-1" id={id}>
            <Form.Label className="rounded-lg mb-2 w-full">{label}</Form.Label>
            <Form.Control
                className="rounded-lg mb-2 mt-2 p-1 pl-2 w-full"
                {...props}
                {...register(name, registerOptions)}
                isInvalid={!error}
            />
            <Form.Control.Feedback type="invalid">
                {error?.message}
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export default TextInputField;
