import { JsonController, Param, Body, Get, Post } from "routing-controllers";
import "reflect-metadata";
import { validate, ValidationError } from "class-validator";
import { Message } from "../models/message";

// const { OpenApiValidator } =
//   require("express-openapi-validate").OpenApiValidator;
// const jsYaml = require("js-yaml");
// const fs = require("fs");
// const openApiDocument = jsYaml.safeLoad(
//   fs.readFileSync("openapi.yaml", "utf-8")
// );

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

const destinationMessage = {
  destination: "",
  messages: [{ text: "", timestamp: "" }],
};

@JsonController()
export class MessageController {
  @Post("/message")
  async post(@Body() message: Message) {
    const JSONMessage = JSON.parse(JSON.stringify(message));
    // destinationMessage.destination = JSONMessage.destination;
    // destinationMessage.messages[0].text = JSONMessage.text;
    // destinationMessage.messages[0].timestamp = JSONMessage.timestamp;
    // sendBatch.batches.push(destinationMessage);
    const messages = {
      text: JSONMessage.text,
      timeStamp: JSONMessage.timestamp,
    };

    let destinationExists = false;

    sendBatch.batches.forEach((batch) => {
      if (batch.destination === JSONMessage.destination) {
        destinationExists = true;
        batch.messages.push({
          text: JSONMessage.text,
          timestamp: JSONMessage.timestamp,
        });
      }
    });

    if (!destinationExists) {
      sendBatch.batches.push({
        destination: JSONMessage.destination,
        messages: [
          {
            text: JSONMessage.text,
            timestamp: JSONMessage.timestamp,
          },
        ],
      });
    }

    return null;
  }

  @Get("/health")
  getAll() {
    return "This action returns this string!";
  }

  @Get("/returnBatches")
  async GetBatchArray() {
    //return "GetBatches Return";
    return sendBatch;
  }

  @Get("/batchCount")
  async BatchCount() {
    return sendBatch.batches.length;
  }
}
