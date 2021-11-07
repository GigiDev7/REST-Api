require("dotenv").config();
//async errors
require("express-async-errors");

//express
const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const notFound = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send('<h1>Store API </h1><a href="/api/v1/products">products</a>');
});

app.use("/api/v1/products", productsRouter);
//products route

app.use(notFound);
app.use(errorMiddleware);

//server
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //connect DB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
