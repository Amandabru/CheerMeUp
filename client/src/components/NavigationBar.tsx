import { Link } from 'react-router-dom';
import { User } from '../userModel';
import NavBarLoggedInView from './NavBarLoggedInView';
import NavBarLoggedOutView from './NavBarLoggedOutView';

interface NavBarProps {
  loggedInUser: User | null;
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccessful: () => void;
}

function NavigationBar({
  loggedInUser,
  onSignUpClicked,
  onLoginClicked,
  onLogoutSuccessful,
}: NavBarProps) {
  return (
    <div className='navbar bg-base-100'>
      <a className='btn btn-ghost normal-case text-xl'>
        <Link to='/'>CheerMeUp</Link>
      </a>
      <a className='btn btn-ghost normal-case text-xl'>
        <Link to='/news'>News</Link>
      </a>
      <a className='btn btn-ghost normal-case text-xl'>
        <Link to='/memes'>Memes</Link>
      </a>
      <a className='btn btn-ghost normal-case text-xl'>
        <Link to='/jokes'>Jokes</Link>
      </a>
      <a className='btn btn-ghost normal-case text-xl'>Suggestions</a>
      {loggedInUser ? (
        <NavBarLoggedInView
          user={loggedInUser}
          onLogoutSuccessful={onLogoutSuccessful}
        />
      ) : (
        <NavBarLoggedOutView
          onLoginClicked={onLoginClicked}
          onSignUpClicked={onSignUpClicked}
        />
      )}
    </div>
  );
}

export default NavigationBar;
