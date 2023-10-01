import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeView from './pages/home/HomeView';
import JokeView from './pages/jokes/JokeView';
import MemeView from './pages/memes/MemeView';
import NewsView from './pages/news/NewsView';
import NotFoundView from './pages/NotFoundView';
import NavigationBar from './components/NavigationBar';
import { useState, useEffect } from 'react';
import { User } from './userModel';
import * as userApi from './api/user';
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
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
      <NavigationBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />
      <div>
        <Routes>
          <Route path='/' element={<HomeView />} />
          <Route path='/jokes' element={<JokeView />} />
          <Route path='/memes' element={<MemeView />} />
          <Route path='/news' element={<NewsView />} />
          <Route path='/*' element={<NotFoundView />} />
        </Routes>
      </div>
      {showSignUpModal && (
        <SignUpModal
          onDismiss={() => setShowSignUpModal(false)}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }}
        />
      )}
      {showLoginModal && (
        <LoginModal
          onDismiss={() => setShowLoginModal(false)}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />
      )}
    </>
  );
}

export default App;
