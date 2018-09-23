const express = require('express');
const router = express.Router();

const { models } = require('../db');
const { Student } = models;

router.get('/', (req, res, next) => {
  Student.findAll()
    .then(schools => res.send(schools))
})

router.delete('/:id', (req, res, next) => {
  Student.findById(1 * req.params.id)
    .then(student => student.destroy())
    .then(() => res.sendStatus(202))
})

module.exports = router;
