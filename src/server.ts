import express from "express";
import { createExpressServer } from "routing-controllers";
import { UserController } from "../controllers/UserController";

const app = createExpressServer({
  controllers: [UserController],
});

app.listen(8080, () => {
  console.log("Application started!");
});
