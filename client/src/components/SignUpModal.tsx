import { User } from '../userModel';
import { useForm } from 'react-hook-form';
import * as userApi from '../api/user';
import { Modal, Form, Button } from 'react-bootstrap';
import TextInputField from './TextInputField';
import { SignUpCredentials } from '../api/user';

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

const SignUpModal = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await userApi.signUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
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
            error={errors.username}
          />
          <TextInputField
            name='email'
            label='Email'
            type='email'
            placeholder='Email'
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.email}
          />
          <TextInputField
            name='password'
            label='Password'
            type='password'
            placeholder='Password'
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.password}
          />
          <Button type='submit' disabled={isSubmitting}>
            Signup
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModal;
