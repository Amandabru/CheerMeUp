import { patchLike } from '../api/patchLike';
import { getJoy } from '../api/getJoy';
import { postLike } from '../api/postLike';
import { JoyToUpdateType } from '../Types';
import { DataStructure, MemeType, JokeType, NewsType } from '../Types';

export class CheerModel {
    private observers: (() => void)[];
    public likedJoys: DataStructure;

    constructor(
        observers = [],
        likedJoys: DataStructure = {
            jokes: [],
            suggestions: [],
            memes: [],
            news: []
        }
    ) {
        this.observers = observers;
        this.likedJoys = likedJoys;
    }

    getLikedJoys(): DataStructure {
        return { ...this.likedJoys };
    }

    setLikedJoys(likedJoys: DataStructure | undefined) {
        if (likedJoys) {
            this.likedJoys = { ...likedJoys };
        }
        this.notifyObservers();
    }

    async likeOrUnlikeMeme(likedMeme: MemeType) {
        const meme = await getJoy('url', likedMeme.url, 'meme');
        if (meme.exists) {
            const memeToUpdate: JoyToUpdateType = {
                id: meme.id,
                type: 'meme',
                searchParamValue: likedMeme.url
            };
            patchLike(memeToUpdate);
            const index = this.likedJoys.memes.findIndex(
                (meme) => meme.url === likedMeme.url
            );

            if (index !== -1) {
                this.likedJoys.memes.splice(index, 1);
            } else {
                this.likedJoys.memes.push(likedMeme);
            }
        } else {
            postLike(likedMeme);
            this.likedJoys.memes.push(likedMeme);
        }
        this.notifyObservers();
    }

    async likeOrUnlikeJoke(likedJoke: JokeType) {
        const likedJoysCopy = { ...this.likedJoys }; // Make a shallow copy

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
                console.log('Removing from liked Joys');
                likedJoysCopy.jokes.splice(index, 1);
            } else {
                console.log('Adding existing joy to liked Joys');
                likedJoysCopy.jokes.push(likedJoke);
            }
        } else {
            console.log('Adding to liked Joys');
            postLike(likedJoke);
            likedJoysCopy.jokes.push(likedJoke);
        }

        // Set the state with the modified copy
        this.setLikedJoys(likedJoysCopy);
        this.notifyObservers();
    }

    async likeOrUnlikeNews(likedNews: NewsType) {
        const news = await getJoy('url', likedNews.url, 'news');
        if (news.exists) {
            const newsToUpdate: JoyToUpdateType = {
                id: news.id,
                type: 'news',
                searchParamValue: likedNews.url
            };
            patchLike(newsToUpdate);
            const index = this.likedJoys.news.findIndex(
                (news) => news.url === likedNews.url
            );

            if (index !== -1) {
                this.likedJoys.news.splice(index, 1);
            } else {
                this.likedJoys.news.push(likedNews);
            }
        } else {
            postLike(likedNews);
            this.likedJoys.news.push(likedNews);
        }
        this.notifyObservers();
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
