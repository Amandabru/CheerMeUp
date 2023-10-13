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
                className="btn btn-ghost normal-case text-xl animate-wiggle"
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
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-10 h-10"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </div>
                </label>
                <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                    {loggedInUser ? (
                        <>
                            <li>
                                <Link to="/profile">
                                    <a className="justify-between">Profile</a>
                                </Link>
                                <Link to="/">
                                    <a onClick={onLogoutClicked}>Logout</a>
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <a onClick={onSignUpClicked}>Sign Up</a>
                            </li>
                            <li>
                                <a onClick={onLoginClicked}>Log In</a>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            {loggedInUser ? (
                <>
                    <p className="ml-4">
                        Signed in as: {loggedInUser.username}
                    </p>
                </>
            ) : null}
        </div>
    );
}

export default NavBarView;
