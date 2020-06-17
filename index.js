const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

//set up express app
const app = express();

//CONNECT TO DB
mongoose.connect(
  "mongodb+srv://extillius:root123@cluster0-a7wze.mongodb.net/restapiapp?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

//Promise
mongoose.Promise = global.Promise;

app.use(express.static("view"));

//BODY PARSER MIDDLEWARE
app.use(bodyparser.json());

//INIT ROUTES
app.use("/api", require("./controller/ninjaController"));

//ERROR HANDLING MIDWARE
app.use((err, req, res, next) => {
  //   console.log(err);
  res.status(422).send({ error: err.message });
});

app.get("/api", (req, res) => {
  console.log("GET REQUEST");
  res.send({ name: "Yoshi", age: 20, status: "GAY" });
});

//HOSTING SERVICE USUALLY HAVE AN ENVIORNMENT VARIABLE TO LISTEN TO SPECIFIC PORT
app.listen(8080, () => {
  console.log("Hey there! You are listening to port 8080");
});
