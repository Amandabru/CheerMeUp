import { User } from '../../userModel';
import {
    DataBaseType,
    DataStructure,
    MemeType,
    JokeType,
    NewsType
} from '../../Types';
import { MemeCard, NewsCard, JokeCard } from '../../components/Card';

function Content({
    user,
    joys,
    likedJoys,
    likeMeme,
    likeNews,
    likeJoke,
    showUserMustLogin
}: {
    user: User | null;
    joys: DataBaseType[];
    likedJoys: DataStructure;
    likeMeme: Function;
    likeNews: Function;
    likeJoke: Function;
    showUserMustLogin: Function;
}) {
    return joys.map((joy, index) => {
        let cardComponent = null;

        if (joy.type === 'meme') {
            cardComponent = (
                <MemeCard
                    key={index}
                    image={(joy.content as MemeType).url}
                    isLiked={
                        likedJoys.memes.find(
                            (meme) => meme.url === (joy.content as MemeType).url
                        )
                            ? true
                            : false
                    }
                    handleLike={() => {
                        user ? likeMeme(joy.content) : showUserMustLogin();
                    }}
                    numberLikes={joy.likes}
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
                    published={(joy.content as NewsType).publishedAt}
                    source={(joy.content as NewsType).source}
                    url={(joy.content as NewsType).url}
                    isLiked={
                        likedJoys.news.find(
                            (news) => news.url === (joy.content as NewsType).url
                        )
                            ? true
                            : false
                    }
                    handleLike={() => {
                        user ? likeNews(joy.content) : showUserMustLogin();
                    }}
                    numberLikes={joy.likes}
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
                                joke.text === (joy.content as JokeType).text
                        )
                            ? true
                            : false
                    }
                    handleLike={() => {
                        user ? likeJoke(joy.content) : showUserMustLogin();
                    }}
                    numberLikes={joy.likes}
                ></JokeCard>
            );
        }

        return cardComponent;
    });
}

export default Content;
