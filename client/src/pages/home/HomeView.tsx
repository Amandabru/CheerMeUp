import { useState } from 'react';
import { User } from '../../userModel';
import {
    DataBaseType,
    DataStructure,
    MemeType,
    JokeType,
    NewsType
} from '../../Types';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import { MemeCard, NewsCard, JokeCard } from '../../components/Card';

function HomeView({
    user,
    mostLikedJoys,
    recentlyLikedJoys,
    likedJoys,
    likeMeme,
    likeNews,
    likeJoke,
    showUserMustLogin
}: {
    user: User | null;
    mostLikedJoys: DataBaseType[];
    recentlyLikedJoys: DataBaseType[];
    likedJoys: DataStructure;
    likeMeme: Function;
    likeNews: Function;
    likeJoke: Function;
    showUserMustLogin: Function;
}) {
    console.log(mostLikedJoys);
    const [selectedView, setSelectedView] = useState<'recently' | 'best'>(
        'best'
    );
    const renderSelectedView = () => {
        if (selectedView === 'best') {
            return (
                <div>
                    {'Most Liked Joys'}
                    {mostLikedJoys.map((joy, index) => {
                        let cardComponent = null;

                        if (joy.type === 'meme') {
                            cardComponent = (
                                <MemeCard
                                    key={index}
                                    image={(joy.content as MemeType).url}
                                    isLiked={
                                        likedJoys.memes.find(
                                            (meme) =>
                                                meme.url ===
                                                (joy.content as MemeType).url
                                        )
                                            ? true
                                            : false
                                    }
                                    handleLike={() => {
                                        likeMeme(joy.content);
                                    }}
                                ></MemeCard>
                            );
                        } else if (joy.type === 'news') {
                            cardComponent = (
                                <NewsCard
                                    key={index}
                                    title={(joy.content as NewsType).title}
                                    image={(joy.content as NewsType).urlToImage}
                                    text={(joy.content as NewsType).text}
                                    author={(joy.content as NewsType).author}
                                    published={
                                        (joy.content as NewsType).publishedAt
                                    }
                                    source={(joy.content as NewsType).source}
                                    url={(joy.content as NewsType).url}
                                    isLiked={
                                        likedJoys.news.find(
                                            (news) =>
                                                news.url ===
                                                (joy.content as NewsType).url
                                        )
                                            ? true
                                            : false
                                    }
                                    handleLike={() => {
                                        likeNews(joy.content);
                                    }}
                                ></NewsCard>
                            );
                        } else if (joy.type === 'joke') {
                            cardComponent = (
                                <JokeCard
                                    key={index}
                                    text={(joy.content as JokeType).text}
                                    isLiked={
                                        likedJoys.jokes.find(
                                            (joke) =>
                                                joke.text ===
                                                (joy.content as JokeType).text
                                        )
                                            ? true
                                            : false
                                    }
                                    handleLike={() => {
                                        likeJoke(joy.content);
                                    }}
                                ></JokeCard>
                            );
                        }

                        return cardComponent;
                    })}
                </div>
            );
        } else if (selectedView === 'recently') {
            return (
                <div>
                    {'Recently Liked Joys'}
                    {recentlyLikedJoys.map((joy, index) => {
                        let cardComponent = null;

                        if (joy.type === 'meme') {
                            cardComponent = (
                                <MemeCard
                                    key={index}
                                    image={(joy.content as MemeType).url}
                                    isLiked={
                                        likedJoys.memes.find(
                                            (meme) =>
                                                meme.url ===
                                                (joy.content as MemeType).url
                                        )
                                            ? true
                                            : false
                                    }
                                    handleLike={() => {
                                        likeMeme(joy.content);
                                    }}
                                ></MemeCard>
                            );
                        } else if (joy.type === 'news') {
                            cardComponent = (
                                <NewsCard
                                    key={index}
                                    title={(joy.content as NewsType).title}
                                    image={(joy.content as NewsType).urlToImage}
                                    text={(joy.content as NewsType).text}
                                    author={(joy.content as NewsType).author}
                                    published={
                                        (joy.content as NewsType).publishedAt
                                    }
                                    source={(joy.content as NewsType).source}
                                    url={(joy.content as NewsType).url}
                                    isLiked={
                                        likedJoys.news.find(
                                            (news) =>
                                                news.url ===
                                                (joy.content as NewsType).url
                                        )
                                            ? true
                                            : false
                                    }
                                    handleLike={() => {
                                        likeNews(joy.content);
                                    }}
                                ></NewsCard>
                            );
                        } else if (joy.type === 'joke') {
                            cardComponent = (
                                <JokeCard
                                    key={index}
                                    text={(joy.content as JokeType).text}
                                    isLiked={
                                        likedJoys.jokes.find(
                                            (joke) =>
                                                joke.text ===
                                                (joy.content as JokeType).text
                                        )
                                            ? true
                                            : false
                                    }
                                    handleLike={() => {
                                        likeJoke(joy.content);
                                    }}
                                ></JokeCard>
                            );
                        }

                        return cardComponent;
                    })}
                </div>
            );
        }
    };
    return (
        <div className="bg-pink-300 text-black min-h-screen bg-fixed">
            <h1 className=" absolute top-[20%] text-4xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                Cheer Me Up!
            </h1>
            <h2 className="absolute top-[26%] text-2xl font-light left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                Welcome to the hub of happiness! If you're feeling bored, in
                need of a good laugh, or have temporarily lost faith in
                humanity, you're in the right place. Our mission is simple: to
                brighten your day!
            </h2>
            <div className="absolute top-[28%] bg-orange-300 ">
                <div className="flex justify-center items-center !scroll-smooth">
                    <button
                        className={`btn btn-accent mb-2 ${
                            selectedView === 'recently' ? 'btn-active' : ''
                        }`}
                        onClick={() => setSelectedView('recently')}
                    >
                        recently
                    </button>
                    <button
                        className={`btn btn-accent ${
                            selectedView === 'best' ? 'btn-active' : ''
                        }`}
                        onClick={() => setSelectedView('best')}
                    >
                        Best
                    </button>
                </div>
                <section className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-20 ml-40 mr-40 mt-20">
                    {renderSelectedView()}
                </section>
            </div>
        </div>
    );
}

export default HomeView;

{
    /*const [selectedView, setSelectedView] = useState<'recently' | 'best'>(
    'recently'
);
const renderSelectedView = () => {
    if (selectedView === 'recently') {
        return <recentlyMemeView />;
    } else if (selectedView === 'best') {
        return <BestMemeView />;
    }
};

return (
    <div className="bg-blue-300 text-black min-h-screen bg-fixed">

        <div className="flex justify-center items-center !scroll-smooth">
            <button
                className={`btn btn-accent mr-5 mt-10 ${
                    selectedView === 'recently' ? 'btn-active' : ''
                }`}
                onClick={() => setSelectedView('recently')}
            >
                recently
            </button>
            <button
                className={`btn btn-accent mr-5 mt-10 ${
                    selectedView === 'best' ? 'btn-active' : ''
                }`}
                onClick={() => setSelectedView('best')}
            >
                Best
            </button>
        </div>

        {renderSelectedView()}
        <div className="h-15"></div>
    </div>
);


{data.map((item, index) => (
                <Card key={index} image={item.url}></Card>
            ))}
            
            
            
            return (
        <div className="bg-pink-300 text-black h-full w-full fixed">
            <h1 className=" absolute top-[13%] text-4xl font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                {' '}
                Cheer Me Up!
            </h1>
            <h2 className=" absolute top-[25%] text-lg font-light left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-144">
                Welcome to the hub of happiness! If you're feeling bored, in
                need of a good laugh, or have temporarily lost faith in
                humanity, you're in the right place. Our mission is simple: to
                brighten your day!
            </h2>
            <div>
                <section className="m-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div>
                        {'Most Liked Joys'}
                        {mostLikedJoys.map((joy, index) => {
                            return (
                                //Return the card here instead, keep the functionality for liking
                                <div
                                    key={index}
                                    onClick={() => {
                                        if (user) {
                                            if (joy.type === 'meme') {
                                                likeMeme(joy.content);
                                            } else if (joy.type === 'news') {
                                                likeNews(joy.content);
                                            } else {
                                                likeJoke(joy.content);
                                            }
                                        } else {
                                            showUserMustLogin();
                                        }
                                    }}
                                >
                                    {'Likeable Incognito Joy'}
                                </div>
                            );
                        })}
                    </div>
                </section>
                <section className="m-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div>
                        {'Recently Liked Joys'}
                        {recentlyLikedJoys.map((joy, index) => {
                            return (
                                //Return the card here instead, keep the functionality for liking
                                <div
                                    key={index}
                                    onClick={() => {
                                        if (user) {
                                            if (joy.type === 'meme') {
                                                likeMeme(joy.content);
                                            } else if (joy.type === 'news') {
                                                likeNews(joy.content);
                                            } else {
                                                likeJoke(joy.content);
                                            }
                                        } else {
                                            showUserMustLogin();
                                        }
                                    }}
                                >
                                    {'Likeable Incognito Joy'}
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );*/
}
