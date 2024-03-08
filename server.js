const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URL;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.set({
    "Allow-access-Allow-Origin": "*",
  });
  res.sendFile(__dirname + "/index.html");
});

app.post("/register", async (req, res) => {
  const data = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };

  // Check if the username already exists in the database
  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    res.send("User already exists. Please choose a different username.");
  } else {
    const userdata = await User.insertMany(data);
    console.log(userdata);
    res.sendFile(__dirname + "/signUpSuccess.html");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
