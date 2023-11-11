export interface IListener {
  isListening(): boolean;
  start(): void;
  stop(): void;
}
