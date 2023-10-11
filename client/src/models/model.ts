import { getSuggestions } from '../api/getSuggestions';
import { getJoke } from '../api/getJoke';
import { getMemes } from '../api/getMemes';
import { MemeType } from '../Types';

export class CheerModel {
    private observers: (() => void)[];
    private activityType: string | null;
    public currentSuggestionData: object | Error | null;
    public currentSuggestionError: object | Error | null;
    private jokeType: string[] | null;
    public currentJokeData: object | Error | null;
    public currentJokeError: object | Error | null;
    public currentMemeData: MemeType[] | Error | null;
    public currentMemeError: object | Error | null;

    constructor(
        observers = [],
        activityType = '',
        jokeType = null,
        currentSuggestionData = null,
        currentSuggestionError = null,
        currentJokeData = null,
        currentJokeError = null,
        currentMemeData = undefined,
        currentMemeError = null
    ) {
        this.observers = observers;
        this.activityType = activityType;
        this.jokeType = jokeType;
        this.currentSuggestionData = currentSuggestionData;
        this.currentSuggestionError = currentSuggestionError;
        this.currentJokeData = currentJokeData;
        this.currentJokeError = currentJokeError;
        this.currentMemeData = currentMemeData;
        this.currentMemeError = currentMemeError;
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

    setMeme() {
        getMemes()
            .then((data: MemeType[] | Error) => {
                this.currentMemeData = data;
                console.log(data);
                this.notifyObservers();
            })
            .catch((error: object | Error) => {
                this.currentMemeError = error;
                this.notifyObservers();
            });
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
