const express = require('express');
const router = express.Router();

const { models } = require('../db');
const { Student, School } = models;

router.use(express.json());

router.get('/', (req, res, next) => {
  Student.findAll({include: School})
    .then(students => res.send(students))
})

router.delete('/:id', (req, res, next) => {
  Student.findById(1 * req.params.id)
    .then(student => student.destroy())
    .then(() => res.sendStatus(202))
})

router.put('/:id', (req, res, next) => {
  Student.findById(1 * req.params.id)
    .then( student => Object.assign(student, req.body))
    .then( student => student.save())
    .then( student => res.send(student))
})

router.post('/', (req, res, next) => {
  Student.create(req.body)
    .then( student => res.send(student))
})

module.exports = router;
