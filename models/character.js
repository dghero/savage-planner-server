const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  userId: {type: String}, //T
  //userId: { type: mongoose.Schema.Types.ObjectId, 
  //          ref: 'User'}// required: true },
  name: {type: String},
  initial: {
    skills:{
      athletics:{
        val: {type: Number, required: true},
        attr: {type: String, required: true} },
      fighting:{
        val: {type: Number, required: true},
        attr: {type: String, required: true} },
      healing:{
        val: {type: Number, required: true},
        attr: {type: String, required: true} },
      intimidation:{
        val: {type: Number, required: true},
        attr: {type: String, required: true} },
      investigation:{
        val: {type: Number, required: true},
        attr: {type: String, required: true} },
      notice:{
        val: {type: Number, required: true},
        attr: {type: String, required: true} },
      persuasion:{
        val: {type: Number, required: true},
        attr: {type: String, required: true} },
      repair:{
        val: {type: Number, required: true},
        attr: {type: String, required: true} },
      riding:{
        val: {type: Number, required: true},
        attr: {type: String, required: true} },
      shooting:{
        val: {type: Number, required: true},
        attr: {type: String, required: true} },
      stealth:{
        val: {type: Number, required: true},
        attr: {type: String, required: true} },
      streetwise:{
        val: {type: Number, required: true},
        attr: {type: String, required: true} },
      survival:{
        val: {type: Number, required: true},
        attr: {type: String, required: true} },
      taunt:{
        val: {type: Number, required: true},
        attr: {type: String, required: true} },
      throwing:{
        val: {type: Number, required: true},
        attr: {type: String, required: true} },
      tracking:{
        val: {type: Number, required: true},
        attr: {type: String, required: true} }
    },
    attributes: {
      strength: {type: Number, required: true},
      agility: {type: Number, required: true},
      vigor: {type: Number, required: true},
      smarts: {type: Number, required: true},
      spirit: {type: Number, required: true}
    }
  },
  advances:[
    {
      xp: {type: Number, required: true},
      advType: {type: String, required: true},
      val: {type: String},
      val2: {type: String},
      // edgeId: {type: String}
      edgeId: {type: mongoose.Schema.Types.ObjectId,
              ref: 'Edge'}
    }
  ]
});

characterSchema.set('timestamps', true);

characterSchema.set('toObject',{
  virtuals: true,
  versionKey: false,
  transform: (document, ret) =>{
    delete ret._id;
  }
});

module.exports = mongoose.model('Character', characterSchema);