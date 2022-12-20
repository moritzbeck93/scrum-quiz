const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const dotnev = require("dotenv").config();

const errorController = require("./controllers/error");
const questionsController = require("./controllers/questions");

const questionsRoutes = require("./routes/questions");

const app = express();
app.use(express.json());

app.use("/quiz", questionsRoutes);

const store = new MongoDBStore({
  uri: process.env.DATABASE_URL,
  collection: "sessions",
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then((result) => {
    app.listen(3080);
  })
  .catch((err) => {
    console.log(err);
  });
