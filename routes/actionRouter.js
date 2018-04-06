const express = require('express');
const router = express.Router();
const db = require('../data/helpers/actionModel.js');

router.get("/", (req, res) => {
  db
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json({ error: "Actions fetch failed" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: `Action ${id} fetch failed` });
    });
});

router.post("/", (req, res) => {
  const action = req.body;

  if (!action.project_id || !action.description) {
    res.status(400).json({
      errorMessage:
        "Does not match",
    });
    return;
  }

  if (action.description.length > 128) {
    res.status(400).json({
      errorMessage:
        "Must be under 128 characters!",
    });
    return;
  }

  db
    .insert(action)
    .then(id => {
      res.status(201).json(action);
    })
    .catch(error => {
      res.status(500).json({ error: "Post failed" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db
    .remove(id)
    .then(action => {
      if (action > 0) {
        res.status(200).json({
          message: `Deleted action ${id}`,
        });
      } else {
        res.status(404).json({ error: `Action ${id} not found` });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Fetch failed" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedAction = req.body;

  db
    .update(id, updatedAction)
    .then(updates => {
      res.status(200).json({
        message: `Updated action ${id}`,
        updatedAction,
      });
    })
    .catch(error => {
      res.status(500).json({ error: "Update failed" });
    });
});

module.exports = router;