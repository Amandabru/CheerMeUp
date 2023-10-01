import { useForm } from 'react-hook-form';
import { User } from '../userModel';
import { LoginCredentials } from '../api/user';
import * as userApi from '../api/user';
import { Modal, Form, Button } from 'react-bootstrap';
import TextInputField from './TextInputField';

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name='username'
            label='Username'
            type='text'
            placeholder='Username'
            register={register}
            registerOptions={{ required: 'Required' }}
            errors={errors.username}
          ></TextInputField>
          <TextInputField
            name='password'
            label='Password'
            type='password'
            placeholder='Password'
            register={register}
            registerOptions={{ required: 'Required' }}
            errors={errors.password}
          ></TextInputField>
          <Button type='submit' disabled={isSubmitting}>
            Log In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
