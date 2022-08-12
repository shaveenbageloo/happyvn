export class Message {
  public destination: string;
  public text: string;
  public timestamp: string;

  constructor(destination: string, text: string, timestamp: string) {
    this.destination = destination;
    this.text = text;
    this.timestamp = timestamp;
  }
}
