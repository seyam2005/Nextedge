const express =
require("express");

const router =
express.Router();

const Experience =
require("../models/Experience");

/* GET */

router.get(
"/",
async(req,res)=>{

const data =
await Experience.find()
.sort({
createdAt:-1
});

res.json(data);

}
);

/* POST */

router.post(
"/",
async(req,res)=>{

const experience =
new Experience(
req.body
);

await experience.save();

res.json(experience);

}
);

/* DELETE */

router.delete(
"/:id",
async(req,res)=>{

await Experience.findByIdAndDelete(
req.params.id
);

res.json({
message:"Deleted"
});

}
);

module.exports = router;