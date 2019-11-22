const express = require('express');
const router = express.Router();
const Student = require('../models/student');

router.get('/', (req, res)=>{
  res.render("profile");
});

router.post('/', (req, res)=>{
  console.log(req.body)
  const student = {
    name: req.body.firstname + " " + req.body.lastname,
    skills: req.body.skills
  }
  Student.create(student)
    .then(student=>{
      res.send(student);
    })
    .catch(e => {
      res.send(e)
    });
});

router.get('/:id', (req, res) => {
  res.send('asdf')
})

router.put('/:id', (req, res)=>{
  res.send({type: 'PUT'});
});

router.delete('/:id', (req, res)=>{
  res.send({type: 'DELETE'});
});

module.exports = router;
