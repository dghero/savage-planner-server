const mongoose = require('mongoose');

const edgeSchema = new mongoose.Schema({
  name: {type: String, required: true},
  req:{
    xp: {type: Number, required: true},
    edges: [{ 
              edgeId: {type: mongoose.Schema.Types.ObjectId, 
              ref: 'Edge', required: true }
            }],
    attrs: [{
      attr: {type: String},
      val: {type: Number}
    }],
    skills: [{
      skill: {type: String}, 
      val: {type: Number}
    }]
  },
  description: {type: String, required: true}

});


edgeSchema.set('timestamps', true);

edgeSchema.set('toObject',{
  virtuals: true,
  versionKey: false,
  transform: (document, ret) =>{
    delete ret._id;
  }
});

module.exports = mongoose.model('Edge', edgeSchema);