const express = require("express");
const router = express.Router();

const upload =
require("../middleware/achievementUpload");

const {
  deleteAchievement
} = require("../controllers/achievementController");

const Achievement =
require("../models/Achievement");

/* GET ALL ACHIEVEMENTS */

router.get("/", async (req, res) => {

  try {

    const achievements =
      await Achievement.find()
      .sort({ year: -1 });

    res.json(achievements);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

/* ADD ACHIEVEMENT */

router.post(
  "/",
  upload.fields([
    {
      name: "image",
      maxCount: 1
    },
    {
      name: "certificate",
      maxCount: 1
    }
  ]),
  async (req, res) => {

    try {

      const achievement =
      await Achievement.create({

        title: req.body.title,
        description: req.body.description,
        year: req.body.year,
        category: req.body.category,
        organizer: req.body.organizer,
        verificationLink:
          req.body.verificationLink,

        image:
          req.files?.image
          ? "/uploads/" +
            req.files.image[0].filename
          : "",

        certificate:
          req.files?.certificate
          ? "/uploads/" +
            req.files.certificate[0].filename
          : ""

      });

      res.json(achievement);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

/* DELETE ACHIEVEMENT */

router.delete(
  "/:id",
  deleteAchievement
);

module.exports = router;