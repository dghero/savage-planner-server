const express = require('express');

//Schema models
//TODO: Add

//Init router
const router = express.Router();

//dummy data 
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
      agility: 6,
      vigor: 6,
      smarts: 8,
      spirit: 4
    }
  },
  advances: [
    {
      xp: 5,
      type: 'edge',
      val: '5b64bd1bc377b892b4c2437d'
        // { 
        //   id: '5b64bd1bc377b892b4c2437d',
        //   name: 'Fleet-Foot',
        //   req: {xp: 0,
        //         edges: [],
        //         skills: [],
        //         attrs: [{attr: 'agility', val: 6}]
        //   },
        //   description: 'The hero\'s Pace is increased by +2 and he rolls a d10 instead of a d6 when running.'
        // }
    },
    {
      xp: 10,
      type: 'attr',
      val: 'spirit'
    },
    {
      xp: 15,
      type: 'newskill',
      val: 'repair'
    },
    {
      xp: 20,
      type: '1skill',
      val: 'fighting'
    },
    {
      xp: 25,
      type: '2skills',
      val: {val1: 'investigation',
            val2: 'intimidation'}
    },
    {
      xp: 30,
      type: 'none'
    },
    {
      xp: 35,
      type: 'none'
    },
    {
      xp: 40,
      type: 'none'
    },
    {
      xp: 45,
      type: 'none'
    },
    {
      xp: 50,
      type: 'none'
    },
    {
      xp: 55,
      type: 'none'
    },
    {
      xp: 60,
      type: 'none'
    },
    {
      xp: 65,
      type: 'none'
    },
    {
      xp: 70,
      type: 'none'
    },
    {
      xp: 75,
      type: 'none'
    },
    {
      xp: 80,
      type: 'none'
    }
  ]
};

//GET all. TODO: Shove into router later
router.get('/', (req, res, next)=>{
  const characters = [character];

  res.json(characters);
});

//GET by id. TODO: Shove into router later
router.get('/:id', (req, res, next)=>{
  const id = req.params.id;

  if(id === character.id)
    res.status(200).json(character);
  else 
    next();
});

module.exports = router;