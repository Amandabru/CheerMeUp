import { DataStructure, MemeType, JokeType, NewsType } from '../Types';

export class CheerModel {
    private observers: (() => void)[];
    public likedJoys: DataStructure;
    public currentJoy: MemeType | NewsType | JokeType | null;

    constructor(
        observers = [],
        likedJoys: DataStructure = {
            jokes: [],
            activities: [],
            memes: [],
            news: []
        },
        currentJoy = null
    ) {
        this.observers = observers;
        this.likedJoys = likedJoys;
        this.currentJoy = currentJoy;
    }

    getLikedJoys(): DataStructure {
        return { ...this.likedJoys };
    }

    getCurrentJoy(): MemeType | JokeType | NewsType | null {
        return this.currentJoy;
    }

    resetCurrentJoy() {
        this.currentJoy = null;
    }

    setLikedJoys(likedJoys: DataStructure | undefined) {
        if (likedJoys) {
            this.likedJoys = { ...likedJoys };
            this.currentJoy = null;
        }
        this.notifyObservers();
    }

    async likeOrUnlikeMeme(likedMeme: MemeType) {
        const likedJoysCopy = { ...this.likedJoys };
        const index = likedJoysCopy.memes.findIndex(
            (meme) => meme.url === likedMeme.url
        );
        if (index !== -1) {
            likedJoysCopy.memes.splice(index, 1);
        } else {
            likedJoysCopy.memes.push(likedMeme);
        }
        this.setLikedJoys(likedJoysCopy);
        this.currentJoy = likedMeme;
        this.notifyObservers();
    }

    async likeOrUnlikeJoke(likedJoke: JokeType) {
        const likedJoysCopy = { ...this.likedJoys };
        const index = likedJoysCopy.jokes.findIndex(
            (j) => j.apiId === likedJoke.apiId
        );
        if (index !== -1) {
            likedJoysCopy.jokes.splice(index, 1);
        } else {
            likedJoysCopy.jokes.push(likedJoke);
        }
        this.setLikedJoys(likedJoysCopy);
        this.currentJoy = likedJoke;
        this.notifyObservers();
    }

    async likeOrUnlikeNews(likedNews: NewsType) {
        const likedJoysCopy = { ...this.likedJoys };
        const index = likedJoysCopy.news.findIndex(
            (news) => news.url === likedNews.url
        );
        if (index !== -1) {
            likedJoysCopy.news.splice(index, 1);
        } else {
            likedJoysCopy.news.push(likedNews);
        }
        this.setLikedJoys(likedJoysCopy);
        this.currentJoy = likedNews;
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
