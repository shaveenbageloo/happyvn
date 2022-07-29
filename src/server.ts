import { createExpressServer } from "routing-controllers";
import { MessageController } from "./controllers/MessageController";

const app = createExpressServer({
  controllers: [MessageController],
});

app.listen(8080, () => {
  console.log("Application started!");
});
