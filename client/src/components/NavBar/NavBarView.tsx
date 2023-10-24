import { User } from '../../userModel';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/images/LogoTest.png';
import { useState } from 'react';
import ProfileIcon from '../UI/ProfileIcon';
import './NavBarAnimation.css';

interface NavBarViewProps {
    loggedInUser: User | null;
    onSignUpClicked: () => void;
    onLoginClicked: () => void;
    onLogoutClicked: () => void;
    onGiveCompliment: () => void;
    onRemoveCompliment: () => void;
    compliment: string | null;
}

function NavBarView({
    loggedInUser,
    onSignUpClicked,
    onLoginClicked,
    onLogoutClicked,
    onGiveCompliment,
    onRemoveCompliment,
    compliment
}: NavBarViewProps) {
    const [activeLink, setActiveLink] = useState<number | null>(null);

    const links = [
        { to: '/news', text: 'News' },
        { to: '/memes', text: 'Memes' },
        { to: '/jokes', text: 'Jokes' },
        { to: '/activities', text: 'Activities' }
    ];

    return (
        <div className="navbar bg-base-100 sticky top-0 z-40 pr-10">
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
                        {links.map((link, index) => (
                            <li key={link.to}>
                                <NavLink
                                    to={link.to}
                                    text={link.text}
                                    isActive={index === activeLink}
                                    onClick={() => setActiveLink(index)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="navbarSmiley">
                    <img
                        className="h-10 normal-case animate-wiggle mr-5 ml-8"
                        src={logoImage}
                        alt="Logo"
                        onMouseEnter={() => onGiveCompliment()}
                        onMouseLeave={() => onRemoveCompliment()}
                    ></img>
                    <div
                        className={
                            compliment
                                ? 'chat chat-start navbarSpeechBubble'
                                : 'hidden'
                        }
                    >
                        <div className="chat-bubble">
                            <p className="compliment">{compliment}</p>
                        </div>
                    </div>
                </div>

                <Link
                    className={
                        compliment ? 'opacity-0' : 'normal-case text-xl mr-5'
                    }
                    to="/"
                    onClick={() => setActiveLink(null)}
                >
                    CheerMeUp!
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                {links.map((link, index) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        text={link.text}
                        isActive={index === activeLink}
                        onClick={() => setActiveLink(index)}
                    />
                ))}
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
                                        onClick={() => setActiveLink(null)}
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

function NavLink({
    to,
    text,
    isActive,
    onClick
}: {
    to: string;
    text: string;
    isActive: boolean;
    onClick: () => void;
}) {
    const decoration = isActive ? 'underline' : '';

    return (
        <Link
            to={to}
            className={`normal-case text-xl mr-10 ${decoration}`}
            onClick={onClick}
        >
            {text}
        </Link>
    );
}

export default NavBarView;
