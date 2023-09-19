//Import Required Packages
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/config");

//Setting up express
app.use(cors());
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
//Setting up Mongoose
mongoose.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
// console.log(db)
db.on("connected", () => {
  console.log("Connected to MongoDB");
});
console.log(config.MONGODB_URL)
//Routes
const userRoutes = require("./routes/user.route")
app.use("/user", userRoutes)

//Server Listening
app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`);
});

//Export Server
module.exports = app;
