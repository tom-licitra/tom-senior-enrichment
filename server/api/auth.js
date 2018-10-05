const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');

const { models } = require('../db');
const { User } = models;

const secret = 'Not how I would actually do this';

router.post('/', (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({
    where: { email, password }
  })
  .then( user => {
    const token = jwt.encode({id: user.id}, secret);
    res.send(token);
  });
})

module.exports = router;
