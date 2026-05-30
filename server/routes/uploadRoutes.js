const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");


/* Storage */

const storage = multer.diskStorage({

  destination: function(req, file, cb) {

    cb(
      null,
      path.join(__dirname, "../uploads")
    );

  },

  filename: function(req, file, cb) {

cb(null, "uploads/");
  }

});

const upload = multer({
  storage
});

/* Upload API */

router.post(
  "/",
  upload.single("image"),
  (req, res) => {

    res.json({

      imageUrl:
      `/uploads/${req.file.filename}`

    });

  }
);

module.exports = router;