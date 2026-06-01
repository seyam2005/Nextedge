const mongoose = require("mongoose");

const experienceSchema =
new mongoose.Schema({

title:{
type:String,
required:true
},

organization:{
type:String,
required:true
},

description:{
type:String,
required:true
},

startDate:{
type:String,
default:""
},

endDate:{
type:String,
default:"Present"
},

type:{
type:String,
default:"Experience"
}

},{
timestamps:true
});

module.exports =
mongoose.model(
"Experience",
experienceSchema
);