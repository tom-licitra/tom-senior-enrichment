const express = require('express');
const router = express.Router();

const { models } = require('../db');
const { School, Student } = models;

router.get('/', (req, res, next) => {
  School.findAll({include: Student})
    .then(schools => res.send(schools))
})

router.delete('/:id', (req, res, next) => {
  School.findById(1 * req.params.id)
    .then(school => school.destroy())
    .then(() => res.sendStatus(202))
})

router.put('/:id', (req, res, next) => {
  let data = req.body;
  School.findById(1 * req.params.id)
    .then( school => Object.assign(school, data))
    .then( school => school.save())
    .then( school => {
      School.findById(school.id, {include: Student})
        .then( _school => res.send(_school))
    })
})

router.post('/', (req, res, next) => {
  School.create(req.body)
    .then( school => {
      School.findById(school.id, {include: Student})
        .then( _school => res.send(_school))
  })
})

module.exports = router;
