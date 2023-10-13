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
            <Link to="/" className="btn btn-ghost normal-case text-xl">
                CheerMeUp
            </Link>
            <Link to="/news" className="btn btn-ghost normal-case text-xl">
                News
            </Link>
            <Link to="/memes" className="btn btn-ghost normal-case text-xl">
                Memes
            </Link>
            <Link to="/jokes" className="btn btn-ghost normal-case text-xl">
                Jokes
            </Link>
            <Link
                to="/suggestions"
                className="btn btn-ghost normal-case text-xl"
            >
                Suggestions
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
