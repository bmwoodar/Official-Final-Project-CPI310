const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const AuthToken = require("../models/authToken")
const yup = require("yup");
const bcrypt = require("bcrypt");
const uuidv4 = require("uuid/v4");

const saltRounds = 10;

router.get("/register", (req, res) => {
  res.render("register");
});

const registrationValidationSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup
  .string()
  .email()
  .required(),
  psw: yup
  .string()
  .min(6)
  .required(),
  ["psw-repeat"]: yup
  .string()
  .oneOf([yup.ref("psw")])
  .required()
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    registrationValidationSchema.validateSync(req.body);
  } catch (e) {
    return res.render("register", { errors: e.errors });
  }
  const existingUser = Student.findOne({ email: req.body.email });
  if (existingUser) {
    return res.render("register", { errors: ["email already taken"] });
  }
  const pwHash = await bcrypt.hash(req.body.psw, saltRounds);
  const newStudent = {
    name: req.body.name,
    password: pwHash,
    email: req.body.email
  };
  Student.create(newStudent)
  .then(student => {
    res.send(student);
  })
  .catch(e => {
    res.send(e);
  });
});

router.get("/login", (req, res) => {
  res.render("signin")
})
router.post("/login", (req, res) => {
  const { email, psw } = req.body;
  // lookup user by Email
  const currentStudent = Student.findOne({ email: email });
  // validate that their password is correct
  if (!currentStudent) {
    return res.render("main", { error: "user not found" });
  }
  // const matches = await bcrypt.compare(psw, currentStudent.password);
  // if (!matches) {
  //   return res.render("main", { error: "password is incorrect" });
  // }
  // create an accesstoken associated with them
  const token = uuidv4();
  AuthToken.create({authToken: token, userId: currentStudent._id});
  // send via cookie
  res.cookie("authToken", token);
  res.redirect("/");
})

router.get("/students", (req, res) => {
  Student.find().then(students => {
    res.render("debug-studentlist", { students });
  });
});

router.post("/student/:id", (req, res) => {
  res.send("TODO");
});

router.get("/student/:id", (req, res) => {
  Student.find({ _id: req.params.id })
  .then(student => {
    res.send(student);
  })
  .catch(e => {
    res.status(500).send(e);
  });
});



// not sure what the intent was here - chuck
// router.put("/:id", (req, res) => {
//   res.send({ type: "PUT" });
// });

// router.delete("/:id", (req, res) => {
//   res.send({ type: "DELETE" });
// });

module.exports = router;
