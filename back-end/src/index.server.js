const express = require("express");
const env = require("dotenv");
const bodyParser = require('body-parser')

const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const app = express();
env.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@shopfurniture.qehlzz2.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Database connected");
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json({ type: 'application/*+json' }))
// app.use(bodyParser.urlencoded({ extended: true }));
require("./models");
app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
