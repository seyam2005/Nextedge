const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({

  title:{
    type:String,
    required:true
  },

  description:{
    type:String,
    required:true
  },

  year:{
    type:String,
    required:true
  },

  type:{
    type:String,
    default:"Achievement"
  },

  image:{
    type:String,
    default:""
  },

  proof:{
    type:String,
    default:""
  }

},{
  timestamps:true
});

module.exports =
mongoose.model(
  "Career",
  careerSchema
);