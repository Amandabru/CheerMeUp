import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeView from './pages/home/HomeView';
import NavBarPresenter from './components/NavBar/NavBarPresenter';
import { useState, useEffect } from 'react';
import { User } from './userModel';
import * as userApi from './api/user';
import LoginPresenter from './components/Login/LoginPresenter';
import SignUpPresenter from './components/SignUp/SignUpPresenter';
import SuggestionPresenter from './pages/suggestions/SuggestionPresenter';
import { CheerModel } from './models/model';
import JokePresenter from './pages/jokes/JokePresenter';
import MemePresenter from './pages/memes/MemePresenter';
import NewsPresenter from './pages/news/NewsPresenter';
import AnimationPresenter from './animations/AnimationsPresenter';

function App() {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const model = new CheerModel();

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
        async function updateLikedJokes() {
            try {
                if (loggedInUser) {
                    const likedJoys = await userApi.getLikedJoys();
                    model.setLikedJoys(likedJoys);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchLoggedInUser();
        updateLikedJokes();
    }, []);

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
                    <Route path="/" element={<HomeView />} />
                    <Route
                        path="/jokes"
                        element={<JokePresenter model={model} />}
                    />
                    <Route
                        path="/memes"
                        element={<MemePresenter model={model} />}
                    />
                    <Route
                        path="/news"
                        element={<NewsPresenter model={model} />}
                    />
                    <Route
                        path="/suggestions"
                        element={<SuggestionPresenter />}
                    />
                    <Route path="/profile" element={<SuggestionPresenter />} />
                </Routes>
            </div>
            <SignUpPresenter
                onSignUpSuccessful={(user) => {
                    setLoggedInUser(user);
                    closeModal('signup_modal');
                }}
            />
            <LoginPresenter
                onLoginSuccessful={(user) => {
                    setLoggedInUser(user);
                    closeModal('login_modal');
                }}
            />
        </>
    );
}
export default App;
