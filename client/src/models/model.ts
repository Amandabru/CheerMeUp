import { getSuggestions } from '../api/getSuggestions';

export class CheerModel {
    private observers: (() => void)[];
    private type: string | null;
    public currentSuggestionData: object | Error;
    public currentSuggestionError: object | Error;

    constructor(observers = [], type = '') {
        this.observers = observers;
        this.type = type;
    }

    setType(id: string | null, multipleParticipants: boolean) {
        //if (id == this.type) return;
        this.type = id;

        this.notifyObservers();
        if (this.type) {
            getSuggestions(this.type, multipleParticipants)
                .then((data: object | Error) => {
                    if (id === this.type) {
                        this.currentSuggestionData = data;
                        console.log(data);
                        this.notifyObservers();
                    }
                })
                .catch((error: object | Error) => {
                    if (id === this.type) {
                        this.currentSuggestionError = error;
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
