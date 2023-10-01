import { User } from '../userModel';
import * as userApi from '../api/user';
import { Button, Navbar } from 'react-bootstrap';

interface NavBarLoggedInViewProps {
  user: User;
  onLogoutSuccessful: () => void;
}

const NavBarLoggedInView = ({
  user,
  onLogoutSuccessful,
}: NavBarLoggedInViewProps) => {
  async function logout() {
    try {
      await userApi.logout();
      onLogoutSuccessful();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  return (
    <>
      <Navbar.Text className='me-2'>Signed in as: {user.username}</Navbar.Text>
      <Button onClick={logout}>Log out</Button>
    </>
  );
};
export default NavBarLoggedInView;
