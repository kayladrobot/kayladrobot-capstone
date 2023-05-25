const express = require('express');
const router = express.Router();
const fs = require('fs');
const data = require('../data/creatives.json');

router.get('/', (req, res) => {
    fs.readFile('./data/creatives.json', (err, data) => {
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
  
  router.get('/:id', (req, res) => {
    const creativeId = parseInt(req.params.id); // Convert the id parameter to a number
  
    fs.readFile('./data/creatives.json', (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        const creatives = JSON.parse(data); // Parse the JSON data into an array of objects
  
        // Filter the array of creatives to find the specific creative with the matching id
        const creative = creatives.find(item => item.id === creativeId);
  
        if (creative) {
          const filteredCreative = {
            id: creative.id,
            name: creative.name,
            bio: creative.bio,
            email: creative.email,
            location: creative.location,
            status: creative.status,
            title: creative.title,
            rate: creative.rate,
            profile: creative.profile,
            available: creative.available,
            education: creative.education,
            labels: creative.labels,
            image: creative.image
          };
  
          console.log("Success");
          console.log("Creative:", filteredCreative);
          res.send(filteredCreative);
        } else {
          console.log("Creative not found");
          res.status(404).send('Creative not found');
        }
      }
    });
  });
  
  
  
  
  

module.exports = router;