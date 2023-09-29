import { apiCall, getSuggestions } from "../api/getSuggestions";

export class CheerModel {
  private observers: (() => void)[];
  private typeID: string;
  public currentSuggestion: string;

  constructor(observers = [], typeID = "", currentSuggestion = "") {
    this.observers = observers;
    this.typeID = typeID;
    this.currentSuggestion = currentSuggestion;
  }

  setTypeID(id: string, multipleParticipants: boolean) {
    if (id == this.typeID) return;
    else this.typeID = id;

    this.notifyObservers();
    if (this.typeID) {
      apiCall(this.typeID, multipleParticipants)
        .then((data) => {
          if (id === this.typeID) {
            this.currentSuggestion = data;
            console.log(data);
            this.notifyObservers();
          }
        })
        .catch((error) => {
          if (id === this.typeID) {
            this.currentSuggestion = error;
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
