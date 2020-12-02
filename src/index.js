const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");

env.config();

// routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

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

app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
