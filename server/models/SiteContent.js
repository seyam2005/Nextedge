const mongoose = require("mongoose");

const siteContentSchema = new mongoose.Schema({

  aboutTitle:{
    type:String,
    default:"About Me"
  },

  aboutText:{
    type:String,
    default:"Welcome to NextEdge"
  }

});

module.exports =
mongoose.model(
  "SiteContent",
  siteContentSchema
);