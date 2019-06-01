let hookahFlavors = require("../models/hookah_flavors.js");
let express = require("express");
let router = express.Router();

// Get all examples
router.get("/api/examples", function (req, res) {
  db.Example.findAll({}).then(function (dbExamples) {
    res.json(dbExamples);
  });
});

router.get("/api/flavors", function (req, res) {
  hookahFlavors.all({}).then(function (data) {
    res.json(data);
  });
});

// Create a new example
router.post("/api/examples", function (req, res) {
  db.Example.create(req.body).then(function (dbExample) {
    res.json(dbExample);
  });
});

// Delete an example by id
router.delete("/api/examples/:id", function (req, res) {
  db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
    res.json(dbExample);
  });
});

