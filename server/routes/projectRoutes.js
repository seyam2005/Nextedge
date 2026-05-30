
const express = require("express");
const router = express.Router();

const Project = require("../models/project");

/* =========================
   ADD PROJECT
========================= */

router.post("/", async (req, res) => {

  try {

    const {
      title,
      description,
      image,
      category
    } = req.body;

    const project = await Project.create({
      title,
      description,
      image,
      category
    });

    res.status(201).json(project);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Failed to create project"
    });

  }

});

/* =========================
   GET ALL PROJECTS
========================= */

router.get("/", async (req, res) => {

  try {

    const projects =
      await Project.find()
      .sort({ createdAt: -1 });

    res.json(projects);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Failed to fetch projects"
    });

  }

});

/* =========================
   DELETE PROJECT
========================= */

router.delete("/:id", async (req, res) => {

  try {

    await Project.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Project deleted"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Delete failed"
    });

  }

});

module.exports = router;
