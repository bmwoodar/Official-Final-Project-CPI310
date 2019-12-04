require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const uri = process.env.MONGO_STRING;
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

const app = express();
const port = 3000;

mongoose.connect(uri, { useNewUrlParser: true });

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

app.use(require("./routes/student-route"));

app.get("/about", (req,res) => {
  res.render("about")
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/connectInfo", (req,res) => {
  res.render("connectInfo")
});

app.get("/createInfo", (req,res) => {
  res.render("createInfo")
});

app.get("/memberIndex", (req,res) => {
  res.render("memberIndex")
});

app.get("/posting", (req,res) => {
  res.render("posting")
});

app.get("/profile", (req,res) => {
  res.render("profile")
});

app.get("/registration", (req,res) => {
  res.render("registration")
});

app.get("/search", (req,res) => {
  res.render("search")
});

app.get("/searchInfo", (req,res) => {
  res.render("searchInfo")
});

app.get("/signin", (req,res) => {
  res.render("signin")
});

app.get("/info", (req,res) =>{
  res.render("info")
});

app.listen(port, function() {
  console.log(`We are listening at port ${port}`);
});
