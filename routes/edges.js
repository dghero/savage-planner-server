const express = require('express');

//Schema models
const Edge = require('../models/edge');

const router = express.Router();



//GET all edges. TODO: Shove into router later
router.get('/', (req, res, next)=>{
  
  Edge.find()
    .sort('name')
    .then(results =>{
      res.json(results);
    })
    .catch(err =>{
      next(err);
    });
});


module.exports = router;