const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema({

title:{
type:String,
required:true
},

abstract:{
type:String,
required:true
},

authors:{
type:String,
default:""
},

journal:{
type:String,
default:""
},

year:{
type:String,
default:""
},

paperLink:{
type:String,
default:""
},

category:{
type:String,
default:"Research"
}

},{
timestamps:true
});

module.exports =
mongoose.model(
"Research",
researchSchema
);