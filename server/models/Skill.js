const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  percentage:{
    type:Number,
    required:true
  },

  category:{
    type:String,
    default:"General"
  }

},
{
  timestamps:true
});

module.exports =
mongoose.model(
  "Skill",
  skillSchema
);