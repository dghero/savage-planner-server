const mongoose = require('mongoose');

const {DATABASE_URL} = require('../config');

const Character = require('../models/character');
const seedCharacters = require('../db/seed/characters');

mongoose.connect(DATABASE_URL)
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() =>{
    return Character.insertMany(seedCharacters);
  })
  .then(results =>{
    console.info('Init db with Character');
  })
  .then(() => mongoose.disconnect())
  .catch(err =>{
    console.error(err);
  });