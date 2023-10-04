import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeView from './pages/home/HomeView';
import JokeView from './pages/jokes/JokeView';
import MemeView from './pages/memes/MemeView';
import NewsView from './pages/news/NewsView';
import NotFoundView from './pages/NotFoundView';
import NavigationBar from './components/NavigationBar';

function App() {
    return (
        <>
            <NavigationBar />
            <div>
                <Routes>
                    <Route path="/" element={<HomeView />} />
                    <Route path="/jokes" element={<JokeView />} />
                    <Route path="/memes" element={<MemeView />} />
                    <Route path="/news" element={<NewsView />} />
                    <Route path="/*" element={<NotFoundView />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
