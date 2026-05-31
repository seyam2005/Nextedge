const Career =
require("../models/Career");

exports.createCareer =
async(req,res)=>{

  try{

    const career =
    await Career.create(req.body);

    res.status(201).json(career);

  }catch(error){

    res.status(500).json(error);

  }

};

exports.getCareer =
async(req,res)=>{

  try{

    const data =
    await Career.find()
    .sort({year:-1});

    res.json(data);

  }catch(error){

    res.status(500).json(error);

  }

};