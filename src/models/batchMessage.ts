export class Batch {}

class batchMessage {
  public destination: string;
  public text: string;
  public timestamp: string;

  constructor(batches: []) {
    batches.push(new destinationMessage(destination, text, timestamp));
  }
}

class destinationMessage {
  public destination: string;
  public messages: Message;

  constructor(
    destination: string,
    messages: [Message],
    text: string,
    timestamp: string
  ) {
    this.destination = destination;
    this.messages = new Message(text, timestamp);
  }
}

class Message {
  public text: string;
  public timestamp: string;

  constructor(text: string, timestamp: string) {
    this.text = text;
    this.timestamp = timestamp;
  }
}
