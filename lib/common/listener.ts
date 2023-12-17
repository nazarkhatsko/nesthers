import { IListener } from "../intefaces/ilistener.interface";

export class Listener<T> implements IListener {
  private _isListening: boolean = false;

  constructor(protected readonly options: T) {}

  isListening(): boolean {
    return this._isListening;
  }

  start() {
    if (this._isListening) {
      throw new Error("");
    }
    this._isListening = true;
  }

  stop() {
    if (!this._isListening) {
      throw new Error("");
    }
    this._isListening = false;
  }
}
