import { createExpressServer } from "routing-controllers";
import { MessageController } from "./controllers/MessageController";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 8080;

const app = createExpressServer({
  controllers: [MessageController],
});

app.listen(`${PORT}`, () => {
  console.log("Server started!");
});
