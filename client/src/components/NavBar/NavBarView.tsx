import { User } from '../../userModel';
import { Link } from 'react-router-dom';

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
            <a className="btn btn-ghost normal-case text-xl">
                <Link to="/">CheerMeUp</Link>
            </a>
            <a className="btn btn-ghost normal-case text-xl">
                <Link to="/news">News</Link>
            </a>
            <a className="btn btn-ghost normal-case text-xl">
                <Link to="/memes">Memes</Link>
            </a>
            <a className="btn btn-ghost normal-case text-xl">
                <Link to="/jokes">Jokes</Link>
            </a>
            <a className="btn btn-ghost normal-case text-xl">Suggestions</a>
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
