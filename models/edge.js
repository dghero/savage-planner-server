const mongoose = require('mongoose');

const edgeSchema = new mongoose.Schema({
  name: {type: String, required: true},
  req:{
    xp: {type: Number, required: true},
    edges: [
      { type: mongoose.Schema.Types.ObjectId, 
      ref: 'Edge', required: true }]
  }

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