const express = require("express");

const router = express.Router();

const Skill =
require("../models/Skill");

/* GET */

router.get(
"/",
async(req,res)=>{

const skills =
await Skill.find()
.sort({percentage:-1});

res.json(skills);

}
);

/* POST */

router.post(
"/",
async(req,res)=>{

const skill =
await Skill.create(req.body);

res.json(skill);

}
);

/* DELETE */

router.delete(
"/:id",
async(req,res)=>{

await Skill.findByIdAndDelete(
req.params.id
);

res.json({
message:"Deleted"
});

}
);

module.exports = router;