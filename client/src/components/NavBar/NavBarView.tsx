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
                className="h-10 normal-case animate-wiggle mr-5"
                src={logoImage}
                alt={'Logo'}
            ></img>

            <Link to="/">
                <a className="normal-case text-2xl mr-10">CheerMeUp</a>
            </Link>
            <Link to="/news">
                <a className="normal-case text-lg mr-10">News</a>
            </Link>
            <Link to="/memes">
                <a className="normal-case text-lg mr-10">Memes</a>
            </Link>

            <Link to="/jokes">
                <a className="normal-case text-lg mr-10">Jokes</a>
            </Link>
            <Link to="/suggestions">
                <a className="normal-case text-lg mr-10">Suggestions</a>
            </Link>
            {loggedInUser ? (
                <>
                    <p>Signed in as: {loggedInUser.username}</p>
                    <button onClick={onLogoutClicked}>Log out</button>
                </>
            ) : (
                <>
                    <div className="divider divider-horizontal" />

                    <button
                        className="btn btn-ghost normal-case text-lg"
                        onClick={onSignUpClicked}
                    >
                        Sign Up
                    </button>
                    <button
                        className="btn btn-ghost normal-case text-lg"
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
