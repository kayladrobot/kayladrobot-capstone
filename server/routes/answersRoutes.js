const express = require('express');
const router = express.Router();
const fs = require('fs');
const uniqid = require('uniqid');
const data = require('../data/answers.json');


router.get('/', (req, res) => {
  fs.readFile('./data/answers.json', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      console.log("Success")
      console.log("Data:", data);
      res.send(data);
    }
  });
});

router.post('/', (req, res) => {
  const answers = JSON.parse(JSON.stringify(data));
  const newAnswer = {
    id: uniqid(),
    answers: req.body.answers.slice(0, 5), // take the first 5 answers
  };
  answers.push(newAnswer);
  fs.writeFile('./data/answers.json', JSON.stringify(answers), (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(201).send(answers); // send the entire answers array
    }
  });
});

module.exports = router;
