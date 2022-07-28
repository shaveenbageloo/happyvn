import express from "express";

const app = express();

app.get("/", (req, res) => {
  const dt = Date();
  res
    .status(200)
    .send("Server listening for your input </br> " + dt.toString());
});

app.get("*", (req, res, next) => {
  setImmediate(() => {
    next(new Error("Something went wrong here!"));
  });
});

app.listen(8080, () => {
  console.log("Application started on port 8080!");
});
