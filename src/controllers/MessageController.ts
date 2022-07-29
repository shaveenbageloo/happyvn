import { JsonController, Param, Body, Get, Post } from "routing-controllers";
import "reflect-metadata";
import { validate, ValidationError } from "class-validator";
import { Message } from "../models/message";

const { OpenApiValidator } =
  require("express-openapi-validate").OpenApiValidator;
const jsYaml = require("js-yaml");
const fs = require("fs");
// const openApiDocument = jsYaml.safeLoad(
//   fs.readFileSync("openapi.yaml", "utf-8")
// );

// let batches = [];

@JsonController()
export class MessageController {
  @Post("/message")
  async post(@Body() message: Message) {
    console.log("Posted the body here.");
    return null;
  }

  @Get("/health")
  getAll() {
    return "This action returns this string!";
  }

  // @Get("/users/:id")
  // getOne(@Param("id") id: number) {
  //   return "This action returns all users";
  // }

  // @Post("/users")
  // post(@Body() userBody: string) {
  //   return "This action returns all users";
  // }
}
