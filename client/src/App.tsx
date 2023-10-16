import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import NavBarPresenter from './components/NavBar/NavBarPresenter';
import { useState, useEffect } from 'react';
import { User } from './userModel';
import * as userApi from './api/user';
import LoginPresenter from './components/Login/LoginPresenter';
import SignUpPresenter from './components/SignUp/SignUpPresenter';
import ActivityPresenter from './pages/activities/ActivityPresenter';
import { CheerModel } from './models/model';
import JokePresenter from './pages/jokes/JokePresenter';
import MemePresenter from './pages/memes/MemePresenter';
import NewsPresenter from './pages/news/NewsPresenter';
import AnimationPresenter from './animations/AnimationsPresenter';
import HomePresenter from './pages/home/HomePresenter';
import ProfilePresenter from './pages/profile/ProfilePresenter';

function App({ model }: { model: CheerModel }) {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    function closeModal(modalId: string) {
        if (document) {
            (document.getElementById(modalId) as HTMLFormElement).close();
        }
    }

    function showModal(modalId: string) {
        if (document) {
            (document.getElementById(modalId) as HTMLFormElement).showModal();
        }
    }

    useEffect(() => {
        async function fetchLoggedInUser() {
            try {
                const user = await userApi.getLoggedInUser();
                setLoggedInUser(user);
            } catch (error) {
                console.log(error);
            }
        }
        if (loggedInUser) {
            fetchLoggedInUser();
        }
    }, []);

    useEffect(() => {
        async function fetchLikedJokes() {
            try {
                if (loggedInUser) {
                    const likedJoys = await userApi.getLikedJoys();
                    model.setLikedJoys(likedJoys);
                    console.log('liked joys', likedJoys);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (loggedInUser) {
            fetchLikedJokes();
        } else {
            model.setLikedJoys({
                jokes: [],
                activities: [],
                memes: [],
                news: []
            });
        }
    }, [loggedInUser]);

    return (
        <>
            <NavBarPresenter
                loggedInUser={loggedInUser}
                onLoginClicked={() => showModal('login_modal')}
                onSignUpClicked={() => showModal('signup_modal')}
                onLogoutSuccessful={() => setLoggedInUser(null)}
            />
            {loggedInUser && <AnimationPresenter user={loggedInUser} />}
            <div>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <HomePresenter
                                model={model}
                                user={loggedInUser}
                                directToLogin={() => showModal('login_modal')}
                            />
                        }
                    />
                    <Route
                        path="/jokes"
                        element={
                            <JokePresenter
                                model={model}
                                user={loggedInUser ? loggedInUser : null}
                                directToLogin={() => showModal('login_modal')}
                            />
                        }
                    />
                    <Route
                        path="/memes"
                        element={
                            <MemePresenter
                                model={model}
                                user={loggedInUser ? loggedInUser : null}
                                directToLogin={() => showModal('login_modal')}
                            />
                        }
                    />
                    <Route
                        path="/news"
                        element={
                            <NewsPresenter
                                model={model}
                                user={loggedInUser ? loggedInUser : null}
                                directToLogin={() => showModal('login_modal')}
                            />
                        }
                    />
                    <Route path="/activities" element={<ActivityPresenter />} />
                    {loggedInUser ? (
                        <Route
                            path="/profile"
                            element={
                                <ProfilePresenter
                                    model={model}
                                    user={loggedInUser}
                                />
                            }
                        />
                    ) : (
                        <Route
                            path="/profile"
                            element={<Navigate to="/" replace />}
                        />
                    )}
                </Routes>
            </div>
            <SignUpPresenter
                directToLogin={() => {
                    closeModal('signup_modal');
                    showModal('login_modal');
                }}
            />
            <LoginPresenter
                onLoginSuccessful={(user) => {
                    setLoggedInUser(user);
                    closeModal('login_modal');
                }}
                directToSignup={() => {
                    closeModal('login_modal');
                    showModal('signup_modal');
                }}
            />
        </>
    );
}
export default App;
