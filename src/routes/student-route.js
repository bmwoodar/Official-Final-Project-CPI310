const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const yup = require("yup");

router.get("/register", (req, res) => {
  res.render("profile");
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
    //.equalTo(yup.ref("psw"))
    .required()
});

router.post("/register", (req, res) => {
  console.log(req.body);
  try {
    registrationValidationSchema.validateSync(req.body);
  } catch (e) {
    console.log(e);
    return res.render("register", { errors: "something's wrong" });
  }
  Student.create(student)
    .then(student => {
      res.send(student);
    })
    .catch(e => {
      res.send(e);
    });
});

router.post("/student/:id");

router.get("/student/:id", (req, res) => {
  res.send("asdf");
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
