require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const uri = process.env.MONGO_STRING;
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const Student = require("./models/student");
const AuthToken = require("./models/authToken")
const yup = require("yup");
const bcrypt = require("bcrypt");
const uuidv4 = require("uuid/v4");

const app = express();
const port = 3000;

var ghettoCredentials = 'randomID';

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
  console.log(ghettoCredentials);
  if (ghettoCredentials != 'randomID') {
    Student.find({ _id: ghettoCredentials._id })
    .then(student => {
    var theStudent = student[0];
    var email = theStudent.name.replace(/\s/g, '') + '@aol.com';
    var theStudentwEmail = {
      name: theStudent.name,
      email: email,
      skills: theStudent.skills
    }
    res.render("studentProfile", theStudentwEmail)
    })
    .catch(e => {
      res.status(500).send(e);
    });
  }
  else {
    res.render("profile")
  }
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

app.get("/signInAgain", (req,res) => {
  Student.findOne({ email: req.query.email })
  .then((student) => {
    console.log(student);
    ghettoCredentials = student._id;
  })
  .catch(e => {
    res.status(500).send(e);
  });
  res.render("index")
});

app.get("/info", (req,res) =>{
  res.render("info")
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.post("/fuckMe", (req, res) => {
  console.log(req.body);
  // try {
  //   registrationValidationSchema.validateSync(req.body);
  // } catch (e) {
  //   return res.render("register", { errors: e.errors });
  // }
  // const existingUser = Student.findOne({ email: req.body.email });
  // if (existingUser) {
  //   return res.render("register", { errors: ["email already taken"] });
  // }
  // const pwHash = await bcrypt.hash(req.body.psw, saltRounds);
  const newStudent = {
    name: req.body.firstname + ' ' + req.body.lastname,
    password: req.body.psw,
    email: req.body.email,
    skills: req.body.skills
  };
  Student.create(newStudent)
  .then(student => {
    console.log(student);
    ghettoCredentials = student._id;
    res.render("studentProfile", student)
  })
  .catch(e => {
    res.send(e);
  });
});

app.get("/findSomeStudents", (req, res) => {
  console.log(req.query.search);
  Student.find({ skills: req.query.search })
  .then((students) => {
    console.log(students);
    res.render("debug-studentlist", { students });
    // res.render("studentProfile", theStudentwEmail)
  })
  .catch(e => {
    res.status(500).send(e);
  });
});



app.listen(port, function() {
  console.log(`We are listening at port ${port}`);
});
