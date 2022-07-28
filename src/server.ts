import express from "express";

const app = express();

app.get("/", (req, res) => {
  const dt = Date();
  res
    .status(200)
    .send("Server listening for your input </br> " + dt.toString());
  console.log("Returned 200 OKAY message");
});

app.listen(8080, () => {
  console.log("Application started!");
});
