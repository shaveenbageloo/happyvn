import { JsonController, Param, Body, Get, Post } from "routing-controllers";
import "reflect-metadata";
import { validate, ValidationError } from "class-validator";
import { Message } from "../models/message";

const MOMENT = require("moment");

const batchTimeout = process.env.BATCH_TIMEOUT || 10;

const TimeDiff = (startTime: any, endTime: any, format: any) => {
  startTime = MOMENT(startTime, "YYYY-MM-DD HH:mm:ss");
  endTime = MOMENT(endTime, "YYYY-MM-DD HH:mm:ss");
  return endTime.diff(startTime, format);
};

let startTime = new Date();
let endTime = new Date();

// let startTime = new Date("2013-5-11 8:37:18");
// let endTime = new Date("2013-5-11 10:37:18");

// const { OpenApiValidator } =
//   require("express-openapi-validate").OpenApiValidator;
// const jsYaml = require("js-yaml");
// const fs = require("fs");
// const openApiDocument = jsYaml.safeLoad(
//   fs.readFileSync("openapi.yaml", "utf-8")
// );

const sendBatch = {
  batches: [],
};

const messagesArray = [];

@JsonController()
export class MessageController {
  @Post("/aggregated-messages")
  async aggregatedMessages(@Body() aggMsg: any) {
    return "AggregratedMessages";
  }

  @Post("/message")
  post(@Body() message: Message) {
    const JSONMessage = JSON.parse(JSON.stringify(message));

    const messages = {
      destination: JSONMessage.destination,
      messages: [
        {
          text: JSONMessage.text,
          timeStamp: JSONMessage.timestamp,
        },
      ],
    };

    if ((messagesArray.length = 0)) {
      startTime = new Date();
    }

    messagesArray.push(messages);
    endTime = new Date();

    const timeDifference = TimeDiff(startTime, endTime, "seconds");
    if (timeDifference >= parseInt(batchTimeout.toString())) {
      console.log("BATCH send all messages to API Endpoint");
      startTime = new Date();
      this.CreateBatch();
    }

    return null;
  }

  @Get("/health")
  getAll() {
    return "This action returns this string!";
  }

  @Get("/returnBatches")
  GetBatchArray() {
    return sendBatch;
  }

  CreateBatch() {
    console.log("Creating batch and sending over to HTTP EndPoint");
  }
}
