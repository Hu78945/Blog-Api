const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();

//Routes
const authRoute = require("./routes/authRoute");
const blogRoute = require("./routes/blogRoute");
const userRoute = require("./routes/userRoute");

//Middelware
app.use(express.json());
app.use(cors());

//Start the server
async function StartServer() {
  await mongoose.connect(process.env.MONGO_URL);
}
StartServer()
  .then(() => console.log("Connected to MongoDb"))
  .catch((err) => console.log(err));

//All the routes
app.use("/auth", authRoute);
app.use("/blog", blogRoute);
app.use("/user", userRoute);

//Listening on the port
app.listen(3000, () => console.log("Server has started"));
