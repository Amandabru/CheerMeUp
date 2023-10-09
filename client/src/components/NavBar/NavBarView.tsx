import { User } from '../../userModel';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/images/LogoTest.png';

interface NavBarViewProps {
    loggedInUser: User | null;
    onSignUpClicked: () => void;
    onLoginClicked: () => void;
    onLogoutClicked: () => void;
}

function NavBarView({
    loggedInUser,
    onSignUpClicked,
    onLoginClicked,
    onLogoutClicked
}: NavBarViewProps) {
    return (
        <div className="navbar bg-base-100">
            <img
                className="btn btn-ghost normal-case text-xl"
                src={logoImage}
                alt={'Logo'}
            ></img>
            <Link to="/">
                <a className="btn btn-ghost normal-case text-xl">CheerMeUp</a>
            </Link>
            <Link to="/news">
                <a className="btn btn-ghost normal-case text-xl">News</a>
            </Link>
            <Link to="/memes">
                <a className="btn btn-ghost normal-case text-xl">Memes</a>
            </Link>
            <Link to="/jokes">
                <a className="btn btn-ghost normal-case text-xl">Jokes</a>
            </Link>
            <Link to="/suggestions">
                <a className="btn btn-ghost normal-case text-xl">Suggestions</a>
            </Link>
            {loggedInUser ? (
                <>
                    <p>Signed in as: {loggedInUser.username}</p>
                    <button onClick={onLogoutClicked}>Log out</button>
                </>
            ) : (
                <>
                    <button
                        className="btn btn-ghost normal-case text-xl"
                        onClick={onSignUpClicked}
                    >
                        Sign Up
                    </button>
                    <button
                        className="btn btn-ghost normal-case text-xl"
                        onClick={onLoginClicked}
                    >
                        Log In
                    </button>
                </>
            )}
        </div>
    );
}

export default NavBarView;
