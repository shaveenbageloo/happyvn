import { createExpressServer } from "routing-controllers";
import { MessageController } from "./controllers/MessageController";
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJsDocs = YAML.load("src/openapi.yaml");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 8082;

const app = createExpressServer({
  controllers: [MessageController],
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

app.listen(`${PORT}`, () => {
  console.log("Server started!");
});
