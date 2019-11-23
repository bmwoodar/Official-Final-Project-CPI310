const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const yup = require("yup");
const bcrypt = require("bcrypt");

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
<<<<<<< HEAD
    //.equalTo(yup.ref("psw"))
=======
    .oneOf([yup.ref("psw")])
>>>>>>> Students can register, add /students page and /student/:id page
    .required()
});

router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    registrationValidationSchema.validateSync(req.body);
  } catch (e) {
    return res.render("register", { errors: e.errors });
  }
  // if (req.body.psw != req.body["psw-repeat"]) {
  //   console.log(req.body.psw);
  //   console.log(req.body["psw-repeat"]);
  //   console.log("oof");
  //   // return res.render("register", { errors: ["passwords must match"] });
  // }
  const existingUser = await Student.findOne({ email: req.body.email });
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

router.get("/students", (req, res) => {
  Student.find().then(students => {
    res.render("debug-studentlist", { students });
  });
});

router.post("/student/:id");

router.get("/student/:id", (req, res) => {
  Student.find({ _id: req.params.id })
    .then(student => {
      res.send(student);
    })
    .catch(e => {
      res.status(500).send(e);
    });
});

router.get("/profile", (req, res) => {
  // redirect to /student/:id
});

router.put("/:id", (req, res) => {
  res.send({ type: "PUT" });
});

router.delete("/:id", (req, res) => {
  res.send({ type: "DELETE" });
});

module.exports = router;
