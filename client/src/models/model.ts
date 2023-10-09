import { getSuggestions } from '../api/getSuggestions';
import { getJoke } from '../api/getJoke';
import { getLikedJoys } from '../api/user';
import { DataStructure, MemeType, JokeType, NewsType } from '../Types';

export class CheerModel {
    private observers: (() => void)[];
    private activityType: string | null;
    public currentSuggestionData: object | Error | null;
    public currentSuggestionError: object | Error | null;
    private jokeType: string[] | null;
    public currentJokeData: object | Error | null;
    public currentJokeError: object | Error | null;

    public likedJoys: DataStructure;

    constructor(
        observers = [],
        activityType = '',
        jokeType = null,
        currentSuggestionData = null,
        currentSuggestionError = null,
        currentJokeData = null,
        currentJokeError = null,

        likedJoys: DataStructure = {
            memes: [],
            jokes: [],
            news: []
        }
    ) {
        this.observers = observers;
        this.activityType = activityType;
        this.jokeType = jokeType;
        this.currentSuggestionData = currentSuggestionData;
        this.currentSuggestionError = currentSuggestionError;
        this.currentJokeData = currentJokeData;
        this.currentJokeError = currentJokeError;

        this.likedJoys = likedJoys;
    }

    addToLikedJoys(likedObject: MemeType | JokeType | NewsType) {
        if (likedObject.type == 'meme') {
            // add object to meme array
            this.likedJoys.memes.push(likedObject as MemeType);
        } else if (likedObject.type == 'joke') {
            // add object to joke array
            this.likedJoys.jokes.push(likedObject as JokeType);
        } else if (likedObject.type == 'news') {
            // add object to news array
            this.likedJoys.news.push(likedObject as NewsType);
        }
    }

    removeFromLikedJoys(likedObject: MemeType | JokeType | NewsType) {
        if (likedObject.type == 'meme') {
            // remove object to meme array
            const memetoRemove = likedObject as MemeType;
            this.likedJoys.memes.filter(
                (meme) => meme.title !== memetoRemove.title
            );
        } else if (likedObject.type == 'joke') {
            // remove object to joke array
            const jokeToRemove = likedObject as JokeType;
            this.likedJoys.jokes.filter(
                (joke) => joke.apiId !== jokeToRemove.apiId
            );
        } else if (likedObject.type == 'news') {
            // remove object to news array
            const newsToRemove = likedObject as NewsType;
            this.likedJoys.news.filter(
                (news) => news.apiId !== newsToRemove.apiId
            );
        }
    }

    setType(id: string | null, multipleParticipants: boolean) {
        //if (id == this.type) return;
        this.activityType = id;

        this.currentSuggestionData = null;
        this.currentSuggestionError = null;

        this.notifyObservers();
        if (this.activityType) {
            getSuggestions(this.activityType, multipleParticipants)
                .then((data: object | Error) => {
                    if (id === this.activityType) {
                        this.currentSuggestionData = data;
                        console.log(data);
                        this.notifyObservers();
                    }
                })
                .catch((error: object | Error) => {
                    if (id === this.activityType) {
                        this.currentSuggestionError = error;
                        this.notifyObservers();
                    }
                });
        }
    }

    setJoke(id: string[]) {
        if (id == this.jokeType) return;
        else this.jokeType = id;

        this.currentJokeData = null;
        this.currentJokeError = null;

        this.notifyObservers();
        if (this.jokeType) {
            getJoke(this.jokeType)
                .then((data: object | Error) => {
                    if (id === this.jokeType) {
                        this.currentJokeData = data;
                        console.log(data);
                        this.notifyObservers();
                    }
                })
                .catch((error: object | Error) => {
                    if (id === this.jokeType) {
                        this.currentJokeError = error;
                        this.notifyObservers();
                    }
                });
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
