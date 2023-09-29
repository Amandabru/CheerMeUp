import { apiCall, getSuggestions } from "../api/getSuggestions";

export class CheerModel {
  private observers: (() => void)[];
  private activityID: string;
  public currentSuggestion: string;

  constructor(observers = [], activityID = "", currentSuggestion = "") {
    this.observers = observers;
    this.activityID = activityID;
    this.currentSuggestion = currentSuggestion;
  }

  setActivityID(id: string) {
    if (id == this.activityID) return;
    else this.activityID = id;

    this.notifyObservers();
    if (this.activityID) {
      apiCall(this.activityID, true)
        .then((data) => {
          if (id === this.activityID) {
            this.currentSuggestion = data;
            this.notifyObservers();
          }
        })
        .catch((error) => {
          if (id === this.activityID) {
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
