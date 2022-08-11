import { JsonController, Param, Body, Get, Post } from "routing-controllers";
import "reflect-metadata";
import { validate, ValidationError } from "class-validator";
import { Message } from "../models/message";
import e from "express";

const batchTimeout = process.env.BATCH_TIMEOUT || 10000;

// const { OpenApiValidator } =
//   require("express-openapi-validate").OpenApiValidator;
// const jsYaml = require("js-yaml");
// const fs = require("fs");
// const openApiDocument = jsYaml.safeLoad(
//   fs.readFileSync("openapi.yaml", "utf-8")
// );

const messagesArray: Message[] = [];

@JsonController()
export class MessageController {
  constructor() {
    console.log("Constructor Method run");
    setInterval(() => {
      console.log("Timer lapsed.");
      console.log(this.aggregatedMessages());
    }, Number(batchTimeout));
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
      const copyMessagesArray = JSON.parse(
        JSON.stringify(messagesArray)
      ) as typeof messagesArray;

      messagesArray.splice(0, messagesArray.length);

      sendBatch.batches.pop();
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

      copyMessagesArray.splice(0, copyMessagesArray.length);
      return JSON.stringify(sendBatch);
    } else {
      return null;
    }
  }

  @Post("/message")
  async post(@Body() message: Message) {
    const JSONMessage = JSON.parse(JSON.stringify(message));

    const msgLength = await messagesArray.push(
      new Message(
        JSONMessage.destination,
        JSONMessage.text,
        JSONMessage.timestamp
      )
    );
    console.log("Message Length now: ", msgLength);

    return null;
  }

  @Get("/health")
  getAll() {
    return "This action returns this string!";
  }

}
