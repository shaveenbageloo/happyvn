import { JsonController, Body, Get, Post } from "routing-controllers";
import "reflect-metadata";
import { Message } from "../models/message";

const batchTimeout = process.env.BATCH_TIMEOUT || 10000;
const messagesArray: Message[] = [];

@JsonController()
export class MessageController {
  constructor() {
    console.log("Constructor Initialized.");
    setInterval(() => {
      console.log("Timer lapsed.");
      console.log(this.aggregatedMessages());
    }, Number(batchTimeout));
  }

  @Post("/message")
  async post(@Body() message: Message) {
    const JSONMessage = JSON.parse(JSON.stringify(message));

    return new Promise(async (resolve, reject) => {
      try {
        if (!(new Date(JSONMessage.timestamp).getTime() > 0)) {
          throw new Error("Invalid Timestamp");
        }

        const msgLength = messagesArray.push(
          new Message(
            JSONMessage.destination,
            JSONMessage.text,
            JSONMessage.timestamp
          )
        );
        console.log("Message Length now: ", msgLength);

        resolve(null);
      } catch (error) {
        console.log("Error when receiving the message: " + error);
        reject("Error when receiving the message: " + error);
      }
    });
  }

  @Post("/aggregated-messages")
  async aggregatedMessages() {
    const sendBatch = {
      batches: [
        {
          destination: "",
          messages: [
            {
              text: "",
              timestamp: "",
            },
          ],
        },
      ],
    };

    if (messagesArray.length != 0) {
      // MAKE A COPY OF THE ORIGINAL MESSAGES ARRAY
      // SO THAT IF THERE ARE NUMEROUS MESSAGES COMING IN FAST ENOUGH
      // WE CAN CONTINUE RECIEVING THEM
      const copyMessagesArray = JSON.parse(
        JSON.stringify(messagesArray)
      ) as typeof messagesArray;

      // CLEAR OUT ORIGINAL MESSAGESARRAY AS WE HAVE MADE A COPY OF IT
      // AND LET NEW MESSAGES FILL UP FROM THE POST(/MESSAGES) API
      messagesArray.splice(0, messagesArray.length);

      // DUE TO BE DECLARING THE JSON OBJECT ABOVE, THERE IS A DEFAULT
      // BLANK ITEM ADDED TO THE BEGINING OF THE ARRAY.  I SIMPLY REMOVE THIS
      sendBatch.batches.pop();

      // NOW WORK WITH THE COPIED ARRAY
      copyMessagesArray.forEach((message) => {
        let destinationFound = false;

        sendBatch.batches.forEach((batchDestination) => {
          if (batchDestination.destination === message.destination) {
            batchDestination.messages.push({
              text: message.text,
              timestamp: message.timestamp,
            });
            destinationFound = true;
          }
        });

        if (!destinationFound) {
          sendBatch.batches.push({
            destination: message.destination,
            messages: [
              {
                text: message.text,
                timestamp: message.timestamp,
              },
            ],
          });
        }
      });

      // NOW CLEAR OUT THE COPIED MESSAGES AS WE HAVE CREATED OUR SENDBATCH
      // JSON TO RETURN
      copyMessagesArray.splice(0, copyMessagesArray.length);
      return JSON.parse(JSON.stringify(sendBatch));
    } else {
      // THIS METHOD IS CALLED EVERY x SECS, IT WILL RETURN A NULL
      // IF THERE AREN'T ANY MESSAGES TO SEND
      return null;
    }
  }

  @Get("/health")
  getAll() {
    return "This action returns this string!";
  }
}
