const express = require("express");
const User = require("./models/user.model");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/users", (req, res) => {
  User.find()
    .then((users) => res.json({ success: true, data: users }))
    .catch((err) => res.status(400).json({ success: false, data: err }));
});

app.post("/user/add", (req, res) => {
  const { fullName, email, password, motivation, githubLink } = req.body;

  const newUser = new User({
    fullName,
    email,
    password,
    motivation,
    githubLink,
  });

  newUser
    .save()
    .then(() =>
      res.json({ success: true, data: "new user added successfully" })
    )
    .catch((err) =>
      res
        .status(400)
        .json({ success: false, data: "failed to add the user, Err : " + err })
    );
});

app.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  const users = await User.find();

  users.map((user) => {
    if (user.email === email && user.password === password) {
      res.status(200).json({ success: true, data: user });
      return;
    }
  });
  res.status(404).json({ success: false, data: "not found" });
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
