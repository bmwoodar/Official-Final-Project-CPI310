const express = require('express');
const router = express.Router();
const Student = require('../models/student');

router.get('/students', (req, res)=>{
  res.send({type: 'GET'});
});

router.post('/students/', (req, res)=>{
  Student.create(req.body).then(student=>{
    res.send(student);
  });
});

router.put('/students/:id', (req, res)=>{
  res.send({type: 'PUT'});
});

router.delete('/students/:id', (req, res)=>{
  res.send({type: 'DELETE'});
});

module.exports = router;
