const express = require("express");
const router = express.Router();

const SiteContent =
require("../models/SiteContent");

/* GET CONTENT */

router.get("/", async(req,res)=>{

  try{

    let content =
    await SiteContent.findOne();

    if(!content){

      content =
      await SiteContent.create({});
    }

    res.json(content);

  }catch(err){

    res.status(500).json({
      message:"Error"
    });

  }

});

/* UPDATE CONTENT */

router.put("/", async(req,res)=>{

  try{

    let content =
    await SiteContent.findOne();

    if(!content){

      content =
      await SiteContent.create({});
    }

    content.aboutTitle =
    req.body.aboutTitle;

    content.aboutText =
    req.body.aboutText;

    await content.save();

    res.json(content);

  }catch(err){

    res.status(500).json({
      message:"Error"
    });

  }

});

module.exports = router;