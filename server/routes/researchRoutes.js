const express =
require("express");

const router =
express.Router();

const Research =
require("../models/Research");

/* GET */

router.get(
"/",
async(req,res)=>{

const data =
await Research.find()
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

const research =
new Research(
req.body
);

await research.save();

res.json(research);

}
);

/* DELETE */

router.delete(
"/:id",
async(req,res)=>{

await Research.findByIdAndDelete(
req.params.id
);

res.json({
message:"Deleted"
});

}
);

module.exports =
router;