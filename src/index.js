const express = require("express");
const env = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

env.config();

// routes
const userRoutes = require("./routes/user");

// Mongodb conn
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.99hd8.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Databases Connected");
  });

app.use(bodyParser.json());
app.use("/api", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
