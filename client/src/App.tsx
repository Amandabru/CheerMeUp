import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeView from './pages/home/HomeView';
import JokeView from './pages/jokes/JokeView';
import MemeView from './pages/memes/MemeView';
import NewsView from './pages/news/NewsView';
import NotFoundView from './pages/NotFoundView';
import NavigationBar from './components/NavigationBar';

import { CheerModel } from './models/model';
import SuggestionPresenter from './pages/suggestions/SuggestionPresenter';

function App() {
    const model = new CheerModel();
    return (
        <>
            <NavigationBar />
            <div>
                <Routes>
                    <Route path="/" element={<HomeView />} />
                    <Route path="/jokes" element={<JokeView />} />
                    <Route path="/memes" element={<MemeView />} />
                    <Route path="/news" element={<NewsView />} />
                    <Route
                        path="/suggestions"
                        element={<SuggestionPresenter model={model} />}
                    />
                    <Route path="/*" element={<NotFoundView />} />
                </Routes>
            </div>
        </>
    );
}
export default App;
