let hookahFlavors = require("../models/hookah_flavors.js");
let reservations = require("../models/tables.js");
let waitList = require("../models/waitlist.js");
let express = require("express");
let router = express.Router();

// Get all reservations
router.get("/api/reservations", function (req, res) {
  console.log("api/reservations was called");
  reservations.all(function (data) {
    res.json({ "reservationsList": data });
  });
});

//Get all waitlist listings
router.get("/api/waitlist", function (req, res) {
  console.log("api/waitlist was called");
  waitList.all(function (data) {
    res.json({ "waitList": data });
  });
});

//Get all hookah flavors
router.get("/api/flavors", function (req, res) {
  console.log("api/flavors was called");
  hookahFlavors.all(function (data) {
    res.json({ "flavorList": data });
  });
});

// Create a new example
//router.post("/api/reservations", function (req, res) {
 // if (reservations)
  //  res.json(dbExample);
  //});
//});

// Delete an example by id
//router.delete("/api/examples/:id", function (req, res) {
//  db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
 //   res.json(dbExample);
 // });
//});

module.exports = router;

