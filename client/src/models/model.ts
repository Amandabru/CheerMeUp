import { getSuggestions } from '../api/getSuggestions';
import { getJoke } from '../api/getJoke';

export class CheerModel {
    private observers: (() => void)[];
    private activityType: string | null;
    public currentSuggestionData: object | Error;
    public currentSuggestionError: object | Error;
    private jokeType: string[] | null;
    public currentJokeData: object | Error;
    public currentJokeError: object | Error;

    constructor(observers = [], activityType = '', jokeType = null) {
        this.observers = observers;
        this.activityType = activityType;
        this.jokeType = jokeType;

        this.currentSuggestionData = {}
        this.currentSuggestionError = {}
        this.currentJokeData = {}
        this.currentJokeError = {}
    }

    setType(id: string | null, multipleParticipants: boolean) {
        //if (id == this.type) return;
        this.activityType = id;

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
