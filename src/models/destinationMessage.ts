export class DestinationMessage {
  public text: string;
  public timestamp: string;

  constructor(text: string, timestamp: string) {
    this.text = text;
    this.timestamp = timestamp;
  }
}
