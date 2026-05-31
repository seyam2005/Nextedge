const express =
require("express");

const router =
express.Router();

const {
createCareer,
getCareer
}
=
require("../controllers/careerController");

router.post(
"/",
createCareer
);

router.get(
"/",
getCareer
);

module.exports =
router;