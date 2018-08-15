const mongoose = require('mongoose');

const {DATABASE_URL} = require('../config');

const Character = require('../models/character');
const Edge = require('../models/edge');
const User = require('../models/user');

const seedCharacters = require('../db/seed/characters');
const seedEdges = require('../db/seed/edges');
const seedUsers = require('../db/seed/users');



mongoose.connect(DATABASE_URL)
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() =>{
    return Promise.all([
      Edge.insertMany(seedEdges),
      Character.insertMany(seedCharacters),
      User.insertMany(seedUsers),
      Edge.createIndexes,
      Character.createIndexes,
      User.createIndexes,

    ]);
  })
  .then(results =>{
    console.info('Init db with Characters, Edges, Users');
  })
  .then(() => mongoose.disconnect())
  .catch(err =>{
    console.error(err);
  });