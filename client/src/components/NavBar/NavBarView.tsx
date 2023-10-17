import { User } from '../../userModel';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/images/LogoTest.png';
import { useState } from 'react';

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
    const [decoration, setDecoration] = useState<string[]>(['', '', '', '']);

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <Link
                                to="/news"
                                className="normal-case text-xl mr-10 "
                            >
                                <span className="">News</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/memes"
                                className="normal-case text-xl mr-10"
                            >
                                Memes
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/jokes"
                                className="normal-case text-xl mr-10"
                            >
                                Jokes
                            </Link>
                        </li>
                        <li>
                            {' '}
                            <Link
                                to="/activities"
                                className="normal-case text-xl mr-10"
                            >
                                Activities
                            </Link>
                        </li>
                    </ul>
                </div>

                <img
                    className="h-10 normal-case animate-wiggle mr-5"
                    src={logoImage}
                    alt={'Logo'}
                ></img>
                <Link
                    className="normal-case text-xl mr-5"
                    to="/"
                    onClick={() => setDecoration(['', '', '', ''])}
                >
                    CheerMeUp!
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <Link
                    className={`normal-case text-xl mr-10 ${decoration[0]}`}
                    to="/news"
                    onClick={() => setDecoration(['underline', '', '', ''])}
                >
                    News
                </Link>

                <Link
                    className={`normal-case text-xl mr-10 ${decoration[1]}`}
                    to="/memes"
                    onClick={() => setDecoration(['', 'underline', '', ''])}
                >
                    Memes
                </Link>

                <Link
                    className={`normal-case text-xl mr-10 ${decoration[2]}`}
                    to="/jokes"
                    onClick={() => setDecoration(['', '', 'underline', ''])}
                >
                    Jokes
                </Link>

                <Link
                    className={`normal-case text-xl mr-10 ${decoration[3]}`}
                    to="/activities"
                    onClick={() => setDecoration(['', '', '', 'underline'])}
                >
                    Activities
                </Link>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div
                            className="w-10 rounded-full"
                            onClick={() => setDecoration(['', '', '', ''])}
                        >
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
                                        <p className="justify-between">
                                            Profile
                                        </p>
                                    </Link>

                                    <p onClick={onLogoutClicked}>Logout</p>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <p onClick={onSignUpClicked}>Sign Up</p>
                                </li>
                                <li>
                                    <p onClick={onLoginClicked}>Log In</p>
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
        </div>
    );
}

export default NavBarView;

/*  <div className="navbar bg-base-100">
          
            <img
                className="h-10 normal-case animate-wiggle mr-5"
                src={logoImage}
                alt={'Logo'}
            ></img>
            <Link to="/" className="normal-case text-xl mr-10">
                CheerMeUp!
            </Link>
            <Link to="/news" className="normal-case text-xl mr-10">
                News
            </Link>
            <Link to="/memes" className="normal-case text-xl mr-10">
                Memes
            </Link>
            <Link to="/jokes" className="normal-case text-xl mr-10">
                Jokes
            </Link>
            <Link to="/activities" className="normal-case text-xl mr-10">
                Activities
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
                                    <p className="justify-between">Profile</p>
                                </Link>

                                <p onClick={onLogoutClicked}>Logout</p>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <p onClick={onSignUpClicked}>Sign Up</p>
                            </li>
                            <li>
                                <p onClick={onLoginClicked}>Log In</p>
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
        </div> */
