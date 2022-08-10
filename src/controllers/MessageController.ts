import { JsonController, Param, Body, Get, Post } from "routing-controllers";
import "reflect-metadata";
import { validate, ValidationError } from "class-validator";
import { Message } from "../models/message";

import MOMENT from "moment";

const batchTimeout = process.env.BATCH_TIMEOUT || 10;

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
  @Post("/aggregated-messages")
  async aggregatedMessages(@Body() aggMsg: any) {
    return "AggregratedMessages";
  }

  @Post("/message")
  post(@Body() message: Message) {
    const JSONMessage = JSON.parse(JSON.stringify(message));

    // const messages = {
    //   destination: JSONMessage.destination,
    //   messages: [
    //     {
    //       text: JSONMessage.text,
    //       timeStamp: JSONMessage.timestamp,
    //     },
    //   ],
    // };

    const msgLength = messagesArray.push(
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

  @Get("/returnBatches")
  GetBatchArray() {
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
    sendBatch.batches.pop();
    messagesArray.forEach((message) => {
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

    return sendBatch;
  }

  CreateBatch() {
    console.log("Creating batch and sending over to HTTP EndPoint");
  }
}
