import { User } from '../userModel';
import { useForm } from 'react-hook-form';
import * as userApi from '../api/user';
import { Form } from 'react-bootstrap';
import TextInputField from './TextInputField';
import { SignUpCredentials } from '../api/user';

interface SignUpModalProps {
  onSignUpSuccessful: (user: User) => void;
}

const SignUpModal = ({ onSignUpSuccessful }: SignUpModalProps) => {
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
    <dialog id='signup_modal' className='modal'>
      <div className='modal-box'>
        <form method='dialog'>
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
            ✕
          </button>
        </form>
        <h3 className='font-bold text-lg'>Sign Up</h3>
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
          <button
            className='btn btn-primary'
            type='submit'
            disabled={isSubmitting}
          >
            Sign Up
          </button>
        </Form>
      </div>
    </dialog>
  );
};

export default SignUpModal;
