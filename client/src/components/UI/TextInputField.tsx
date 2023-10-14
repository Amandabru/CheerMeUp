import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { Form } from 'react-bootstrap';

interface TextInputFieldProps {
    id: string;
    name: string;
    label: string;
    register: UseFormRegister<any>;
    registerOptions?: RegisterOptions;
    error?: FieldError;
    [x: string]: any;
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
        <Form.Group className="mb-3" id={id}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
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
