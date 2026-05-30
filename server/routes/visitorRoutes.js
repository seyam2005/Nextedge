const express = require("express");
const router = express.Router();

const Visitor = require("../models/Visitor");

/* COUNT VISIT */

router.post("/", async (req, res) => {

  let visitor = await Visitor.findOne();

  if (!visitor) {

    visitor = await Visitor.create({
      count: 1
    });

  } else {

    visitor.count += 1;
    await visitor.save();

  }

  res.json(visitor);

});

/* GET COUNT */

router.get("/", async (req, res) => {

  const visitor = await Visitor.findOne();

  res.json({
    count: visitor ? visitor.count : 0
  });

});

module.exports = router;