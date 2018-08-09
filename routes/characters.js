const express = require('express');

//Schema models
const Character = require('../models/character');
const Edge = require('../models/edge');

//Init router
const router = express.Router();

const skillKeys = [
  'athletics',
  'fighting',
  'healing',
  'intimidation',
  'investigation',
  'notice',
  'persuasion',
  'repair',
  'riding',
  'shooting',
  'stealth',
  'streetwise',
  'survival',
  'taunt',
  'throwing',
  'tracking'];

const advanceKeys=[
  'xp',
  'advType',
  'val',
  'val2',
  'edgeId'
];

const attrKeys =[
  'strength',
  'vigor',
  'agility',
  'smarts',
  'spirit'
];

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
      intimidation:{val:0, attr: 'spirit'},
      investigation:{val:0, attr: 'smarts'},
      notice:{val:0, attr: 'smarts'},
      persuasion:{val:0, attr: 'spirit'},
      repair:{val:0, attr: 'smarts'},
      riding:{val:4, attr: 'agility'},
      shooting:{val:4, attr: 'agility'},
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
      advType: 'edge',
      edgeId: '5b64bd1bc377b892b4c2437d'
    },
    {
      xp: 10,
      advType: 'attr',
      val: 'spirit'
    },
    {
      xp: 15,
      advType: 'newskill',
      val: 'repair'
    },
    {
      xp: 20,
      advType: '1skill',
      val: 'repair'
    },
    {
      xp: 25,
      advType: '2skills',
      val: 'riding',
      val2: 'shooting'
    },
    {
      xp: 30,
      advType: 'none'
    },
    {
      xp: 35,
      advType: 'none'
    },
    {
      xp: 40,
      advType: 'none'
    },
    {
      xp: 45,
      advType: 'none'
    },
    {
      xp: 50,
      advType: 'none'
    },
    {
      xp: 55,
      advType: 'none'
    },
    {
      xp: 60,
      advType: 'none'
    },
    {
      xp: 65,
      advType: 'none'
    },
    {
      xp: 70,
      advType: 'none'
    },
    {
      xp: 75,
      advType: 'none'
    },
    {
      xp: 80,
      advType: 'none'
    }
  ]
};

//GET all
router.get('/', (req, res, next)=>{
  
  Character.find()
   .populate('advances.edgeId')
    .then(results =>{
      res.json(results);
    })
    .catch(err =>{
      next(err);
    });
});

//GET by id
router.get('/:id', (req, res, next)=>{
  const id = req.params.id;

  //TODO: find by id later
  Character.findOne({_id: id})
    .populate('advances.edgeId')
    .then(results =>{
      if(results) res.json(results);
      else next();
    })
    .catch(err =>{
      next(err);
    });
});

//PUT update by id
router.put('/:id', (req, res, next)=>{
  const id = req.params.id;
  const updateObj ={$set: {}};
  let hasVal = false;
  
  if(req.body.hasOwnProperty('initial')){
    //Fetch attribute to set
    if(req.body.initial.hasOwnProperty('attributes') 
          && Object.keys(req.body.initial.attributes).length > 0){

      attrKeys.forEach(key =>{
        if(req.body.initial.attributes.hasOwnProperty(key)){
          hasVal = true;
          updateObj.$set[`initial.attributes.${key}`] = 
                        req.body.initial.attributes[key];
        }
      });
    }
    //Fetch skill to set
    if(req.body.initial.hasOwnProperty('skills')
          && Object.keys(req.body.initial.skills).length > 0){
        
      skillKeys.forEach(key =>{
        if(req.body.initial.skills.hasOwnProperty(key)){
          hasVal = true;
          updateObj.$set[`initial.skills.${key}.val`] = 
                        req.body.initial.skills[key].val;
        }
      });
    }
  }

  if(req.body.hasOwnProperty('advance')){
    //hasVal = true;
    const updateAdvKeys = Object.keys(req.body.advance);
    if( updateAdvKeys.sort().join(',') !== (advanceKeys.sort()).join(',') ){
      const err = new Error('Missing or unknown key in `advance`');
      err.status = 500;
      return next(err);
    }
    hasVal = true;
    const xpIndex = req.body.advance.xp/5 - 1;
    updateObj.$set[`advances.${xpIndex}`] = req.body.advance;
  }
  
  //Nothing to update, don't do it
  if(!hasVal){
    const err = new Error('No valid update fields in request body');
    err.status = 400;
    return next(err);
  }

  //TODO: Validate name

  //TODO: Validate any starting skill/attribute numbers belong to 0, 4, 6, 8, 10, 12

  //TODO: Anything with edges

  const options = {new: true};

  Character.findByIdAndUpdate(id, updateObj, options)
    .then(results =>{
      if(results) res.json(results);
      else next();
    })
    .catch(err =>{
      next(err);
    });
});

module.exports = router;