import { patchLike } from '../api/patchLike';
import { getJoy } from '../api/getJoy';
import { postLike } from '../api/postLike';
import { JoyToUpdateType } from '../Types';
import { DataStructure, MemeType, JokeType, NewsType } from '../Types';

export class CheerModel {
    private observers: (() => void)[];
    public likedJoys: DataStructure;
    public currentMeme: MemeType | null;

    constructor(
        observers = [],
        likedJoys: DataStructure = {
            jokes: [],
            activities: [],
            memes: [],
            news: []
        },
        currentMeme = null
    ) {
        this.observers = observers;
        this.likedJoys = likedJoys;
        this.currentMeme = currentMeme;
    }

    getLikedJoys(): DataStructure {
        return { ...this.likedJoys };
    }

    getCurrentMeme(): MemeType | null {
        return this.currentMeme;
    }

    resetCurrentMeme() {
        this.currentMeme = null;
    }

    setLikedJoys(likedJoys: DataStructure | undefined) {
        if (likedJoys) {
            this.likedJoys = { ...likedJoys };
        }
        this.notifyObservers();
    }

    async likeOrUnlikeMeme(likedMeme: MemeType) {
        try {
            const likedJoysCopy = { ...this.likedJoys };
            const index = likedJoysCopy.memes.findIndex(
                (meme) => meme.url === likedMeme.url
            );

            if (index !== -1) {
                likedJoysCopy.memes.splice(index, 1);
            } else {
                likedJoysCopy.memes.push(likedMeme);
            }
            this.currentMeme = likedMeme;
            this.setLikedJoys(likedJoysCopy);
            this.notifyObservers();
        } catch (error) {
            console.log(error);
        }
    }

    async likeOrUnlikeJoke(likedJoke: JokeType) {
        try {
            const likedJoysCopy = { ...this.likedJoys };
            const joke = await getJoy('apiId', likedJoke.apiId, 'joke');
            if (joke.exists) {
                const jokeToUpdate: JoyToUpdateType = {
                    id: joke.id,
                    type: 'joke',
                    searchParamValue: likedJoke.apiId
                };
                patchLike(jokeToUpdate);
                const index = likedJoysCopy.jokes.findIndex(
                    (j) => j.apiId === likedJoke.apiId
                );

                if (index !== -1) {
                    likedJoysCopy.jokes.splice(index, 1);
                } else {
                    likedJoysCopy.jokes.push(likedJoke);
                }
            } else {
                postLike(likedJoke);
                likedJoysCopy.jokes.push(likedJoke);
            }

            this.setLikedJoys(likedJoysCopy);
            this.notifyObservers();
        } catch (error) {
            console.log(error);
        }
    }

    async likeOrUnlikeNews(likedNews: NewsType) {
        try {
            const likedJoysCopy = { ...this.likedJoys };
            const encodedUrl = encodeURIComponent(likedNews.url);
            const news = await getJoy('url', encodedUrl, 'news');
            if (news.exists) {
                const newsToUpdate: JoyToUpdateType = {
                    id: news.id,
                    type: 'news',
                    searchParamValue: likedNews.url
                };
                patchLike(newsToUpdate);
                const index = likedJoysCopy.news.findIndex(
                    (news) => news.url === likedNews.url
                );

                if (index !== -1) {
                    likedJoysCopy.news.splice(index, 1);
                } else {
                    likedJoysCopy.news.push(likedNews);
                }
            } else {
                postLike(likedNews);
                likedJoysCopy.news.push(likedNews);
            }
            this.setLikedJoys(likedJoysCopy);
            this.notifyObservers();
        } catch (error) {
            console.log(error);
        }
    }

    addObserver(callback: () => void) {
        this.observers = [...this.observers, callback];
    }

    removeObserver(callback: () => void) {
        this.observers = this.observers.filter(
            (observer) => observer !== callback
        );
    }

    notifyObservers() {
        this.observers.forEach((callback) => {
            try {
                callback();
            } catch (error) {
                console.log(error);
            }
        });
    }
}
