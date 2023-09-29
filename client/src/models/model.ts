import { getSuggestions } from "../api/getSuggestions";

export class CheerModel {
  private observers: (() => void)[];
  private type: string;
  public currentSuggestion: string;

  constructor(observers = [], type = "", currentSuggestion = "") {
    this.observers = observers;
    this.type = type;
    this.currentSuggestion = currentSuggestion;
  }

  // TODO: uppdatera till setSuggestion istället antagligen
  setType(id: string, multipleParticipants: boolean) {
    //if (id == this.type) return;
    this.type = id;

    this.notifyObservers();
    if (this.type) {
      getSuggestions(this.type, multipleParticipants)
        .then((data) => {
          if (id === this.type) {
            this.currentSuggestion = data;
            console.log(data);
            this.notifyObservers();
          }
        })
        .catch((error) => {
          if (id === this.type) {
            this.currentSuggestion = error; // error handling ska tilläggas mm
            this.notifyObservers();
          }
        });
    }
  }

  addObserver(callback: () => void) {
    this.observers = [...this.observers, callback];
  }

  removeObserver(callback: () => void) {
    this.observers = this.observers.filter((observer) => observer !== callback);
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
