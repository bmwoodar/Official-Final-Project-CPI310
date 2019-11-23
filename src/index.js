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

app.get("/", (req, res) => {
  res.send("hi there");
});

app.listen(port, function() {
  console.log(`We are listening at port ${port}`);
});
