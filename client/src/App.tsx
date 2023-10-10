import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeView from './pages/home/HomeView';
import JokeView from './pages/jokes/JokeView';
import MemeView from './pages/memes/MemeView';
import NewsView from './pages/news/NewsView';
import NotFoundView from './pages/NotFoundView';
import NavBarPresenter from './components/NavBar/NavBarPresenter';
import { useState, useEffect } from 'react';
import { User } from './userModel';
import * as userApi from './api/user';
import LoginPresenter from './components/Login/LoginPresenter';
import SignUpPresenter from './components/SignUp/SignUpPresenter';
import SuggestionPresenter from './pages/suggestions/SuggestionPresenter';
import { CheerModel } from './models/model';
import JokePresenter from './pages/jokes/JokePresenter';
import AnimationPresenter from './animations/AnimationsPresenter';
import HomePresenter from './pages/home/HomePresenter';

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
        fetchLoggedInUser();
    }, []);

    return (
        <>
            <NavBarPresenter
                loggedInUser={loggedInUser}
                onLoginClicked={() => showModal('login_modal')}
                onSignUpClicked={() => showModal('signup_modal')}
                onLogoutSuccessful={() => setLoggedInUser(null)}
            />
            <AnimationPresenter />
            <div>
                <Routes>
                    <Route path="/" element={<HomePresenter model={model} />} />
                    <Route
                        path="/jokes"
                        element={<JokePresenter model={model} />}
                    />
                    <Route path="/memes" element={<MemeView />} />
                    <Route path="/news" element={<NewsView />} />
                    <Route
                        path="/suggestions"
                        element={<SuggestionPresenter model={model} />}
                    />
                    <Route
                        path="/profile"
                        element={<SuggestionPresenter model={model} />}
                    />
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
