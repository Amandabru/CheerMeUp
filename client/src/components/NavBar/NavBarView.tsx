import { User } from '../../userModel';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/images/LogoTest.png';
import { useState } from 'react';
import ProfileIcon from '../UI/ProfileIcon';

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
        <div className="navbar bg-base-100 fixed top-0 z-40 pr-10">
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
                        <div className="w-10 rounded-full">
                            {loggedInUser ? (
                                <ProfileIcon loggedIn={true} />
                            ) : (
                                <ProfileIcon loggedIn={false} />
                            )}
                        </div>
                    </label>
                    <ul
                        tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                    >
                        {loggedInUser ? (
                            <>
                                <li>
                                    <Link
                                        to="/profile"
                                        onClick={() =>
                                            setDecoration(['', '', '', ''])
                                        }
                                    >
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
                        <p className="ml-4">{loggedInUser.username}</p>
                    </>
                ) : null}
            </div>
        </div>
    );
}

export default NavBarView;
