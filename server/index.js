const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const api = require("../server/controllers/doc");
//Loads environment variables from .env file
require("dotenv").config();
const app = express();

//Connecting Database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// app middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);

//Establishing server port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
