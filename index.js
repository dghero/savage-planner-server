'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();


app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

//GET all. TODO: Shove into router later
app.get('/api/characters', (req, res, next)=>{
  const characters = [{
    id: '5b64b162560e648424b32a61',
    userId: null,
    name: 'CHARACTER MAN',
    initial: {
      skills: {
        athletics:{val:8, attr: 'strength'},
        fighting:{val:10, attr: 'agility'},
        healing:{val:8, attr: 'smarts'},
        intimidation:{val:4, attr: 'spirit'},
        investigation:{val:4, attr: 'smarts'},
        notice:{val:0, attr: 'smarts'},
        persuasion:{val:0, attr: 'spirit'},
        repair:{val:0, attr: 'smarts'},
        riding:{val:0, attr: 'agility'},
        shooting:{val:0, attr: 'agility'},
        stealth:{val:0, attr: 'agility'},
        streetwise:{val:0, attr: 'smarts'},
        survival:{val:0, attr: 'smarts'},
        taunt:{val:0, attr: 'spirit'},
        throwing:{val:0, attr: 'agility'},
        tracking:{val:0, attr: 'smarts'}
      },
      attributes: {
        strength: 6,
        vigor: 6,
        agility: 6,
        smarts: 8,
        spirit: 4
      }
    },
    advances: [
      null
    ]
  }];

  res.json(characters);
});

//GET by id. TODO: Shove into router later
app.get('/api/characters/:id', (req, res, next)=>{
  const id = req.params.id;
  const character = {
    id: '5b64b162560e648424b32a61',
    userId: null,
    name: 'CHARACTER MAN',
    initial: {
      skills: {
        athletics:{val:8, attr: 'strength'},
        fighting:{val:10, attr: 'agility'},
        healing:{val:8, attr: 'smarts'},
        intimidation:{val:4, attr: 'spirit'},
        investigation:{val:4, attr: 'smarts'},
        notice:{val:0, attr: 'smarts'},
        persuasion:{val:0, attr: 'spirit'},
        repair:{val:0, attr: 'smarts'},
        riding:{val:0, attr: 'agility'},
        shooting:{val:0, attr: 'agility'},
        stealth:{val:0, attr: 'agility'},
        streetwise:{val:0, attr: 'smarts'},
        survival:{val:0, attr: 'smarts'},
        taunt:{val:0, attr: 'spirit'},
        throwing:{val:0, attr: 'agility'},
        tracking:{val:0, attr: 'smarts'}
      },
      attributes: {
        strength: 6,
        vigor: 6,
        agility: 6,
        smarts: 8,
        spirit: 4
      }
    },
    advances: [
      null
    ]
  };

  if(id === character.id)
    res.json(character);
  else 
    next();
});


//Custom 404 not found route
app.use((req, res, next) =>{
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

//Custom Error Handler
app.use((err, req, res, next) =>{
  if(err.status){
    const errBody = Object.assign({}, err, {message: err.message});
    res.status(err.status).json(errBody);
  }else{
    console.error(err);
    res.status(500).json({message: 'Internal Server Error'});
  }
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
