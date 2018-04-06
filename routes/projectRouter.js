const express = require('express');
const router = express.Router();
const db = require('../data/helpers/projectModel.js');

router.get("/", (req, res) => {
  db
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json({ error: "Fetch failed" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: `Project ${id} fetch failed` });
    });
});

router.get("/:id/actions", (req, res) => {
  const { id } = req.params;

  db
    .getProjectActions(id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "Action fetch failed" });
    });
});

router.post("/", (req, res) => {
  const project = req.body;

  if (!project.name || !project.description) {
    res.status(400).json({
      errorMessage: "Missing field(s)",
    });
    return;
  }

  if (project.name.length > 128 || project.description.length > 128) {
    res.status(400).json({
      errorMessage:
        "Must be under 128 characters",
    });
    return;
  }

  db
    .insert(project)
    .then(id => {
      res.status(201).json(project);
    })
    .catch(error => {
      res.status(500).json({ error: "Post failed" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db
    .remove(id)
    .then(project => {
      if (project > 0) {
        res.status(200).json({
          message: `Deleted project ${id}`,
        });
      } else {
        res.status(404).json({ error: `Project ${id} not found` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Fetch failed" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedProject = req.body;

  db
    .update(id, updatedProject)
    .then(updates => {
      res.status(200).json({
        message: `Updated project ${id}`,
        updatedProject,
      });
    })
    .catch(error => {
      res.status(500).json({ error: "Update failed" });
    });
});

module.exports = router;