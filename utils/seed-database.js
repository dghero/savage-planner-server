const mongoose = require('mongoose');

const {DATABASE_URL} = require('../config');

const Character = require('../models/character');
const seedCharacters = require('../db/seed/characters');

const Edge = require('../models/edge');
const seedEdges = require('../db/seed/edges');

mongoose.connect(DATABASE_URL)
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() =>{
    return Promise.all([
      Character.insertMany(seedCharacters),
      Edge.insertMany(seedEdges)
    ]);
  })
  .then(results =>{
    console.info('Init db with Characters, Edges');
  })
  .then(() => mongoose.disconnect())
  .catch(err =>{
    console.error(err);
  });