const express = require('express');

//Schema models
const Edge = require('../models/edge');

const router = express.Router();



//GET all edges. TODO: Shove into router later
router.get('/', (req, res, next)=>{
  const edges = [
    { id: '5b64bd1bc377b892b4c2437d',
      name: 'Fleet-Foot',
      req: {xp: 0,
            edges: [],
            skills: [],
            attrs: [{attr: 'agility', val: 6}]
      },
      description: 'The hero\'s Pace is increased by +2 and he rolls a d10 instead of a d6 when running.'
    },

    { id: '5b64bd31b1f10d8c48bb2e31',
      name: 'Fleetest-Foot',
      req: {xp: 20,
            edges: ['5b64bd1bc377b892b4c2437d'],
            skills: [],
            attrs: []
      },
      description: 'Run like a ninja. Increases pace by 2, and your character can run on liquids.'
    },

    { id: '5b64bd31b1f10d8c48bb2e32',
      name: 'Alertness',
      req: {xp: 0,
            edges: [],
            skills: [],
            attrs: []
      },
      description: 'Not much gets by your hero. He\'s very observant and perceptive, and adds +2 to his Notice rolls to hear, see, or otherwise sense the world around him.'
    },

    
    { id: '5b64bd31b1f10d8c48bb2e33',
      name: 'Luck',
      req: {xp: 0,
            edges: [],
            skills: [],
            attrs: []
      },
      description: 'The adventurer seems to be blessed by fate, karma, the gods, or whatever external forces he believes in (or believe in him!) He draws one extra Benny at the beginning of each game session, allowing him to succeed at important tasks more often than most, and survive incredible dangers.'
    },

    
    { id: '5b64bd31b1f10d8c48bb2e34',
      name: 'Rock and Roll!',
      req: {xp: 20,
            edges: [],
            skills: [{skill: 'shooting', val: 8}],
            attrs: []
      },
      description: 'Some veteran shooters learn to compensate for the recoil of fully automatic weapons. If a character with this Edge does not move, he may ignore the recoil penalty for firing a weapon on full automatic.'
    }

  ];

  Edge.find()
    .then(results =>{
      res.json(results);
    })
    .catch(err =>{
      next(err);
    });

});


module.exports = router;