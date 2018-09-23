const express = require('express');
const router = express.Router();

const { models } = require('../db');
const { School } = models;

router.get('/', (req, res, next) => {
  School.findAll()
    .then(schools => res.send(schools))
})

module.exports = router;
