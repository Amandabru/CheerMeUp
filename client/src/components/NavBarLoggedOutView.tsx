import { Button } from 'react-bootstrap';

interface NavBarLoggedOutViewProps {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}

const NavBarLoggedOutView = ({
  onSignUpClicked,
  onLoginClicked,
}: NavBarLoggedOutViewProps) => {
  return (
    <>
      <Button
        className='btn btn-ghost normal-case text-xl'
        onClick={onSignUpClicked}
      >
        Sign Up
      </Button>
      <Button
        className='btn btn-ghost normal-case text-xl'
        onClick={onLoginClicked}
      >
        Log In
      </Button>
    </>
  );
};
export default NavBarLoggedOutView;
