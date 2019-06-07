let hookahFlavors = require("../models/hookah_flavors.js");
let reservations = require("../models/tables.js");
let waitList = require("../models/waitlist.js");
let express = require("express");
let router = express.Router();

// Get all reservations
router.get("/api/reservations", function (req, res) {
  console.log("get api/reservations was called");
  reservations.all(function (data) {
    console.log(data);
    res.json(data);
    // res.json({ "reservationsList": data });
  });
});

router.put("/api/reservations/:id", function (req, res) {
  console.log("put api/reservations was called");
  reservations.update(Object.keys(req.body), Object.values(req.body), "ID", id, function (data) {
    res.json({ "waitList": data });
  });
  // res.json({ "reservationsList": data });
});

//Get all waitlist listings
router.get("/api/waitlist", function (req, res) {
  console.log("get api/waitlist was called");
  waitList.all(function (data) {
    res.json({ "waitList": data });
  });
});

//Add reservation to waitlist
router.post("/api/waitlist", function (req, res) {
  console.log("post api/waitlist was called");
  waitList.create(Object.keys(req.body), Object.values(req.body), function (data) {
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

// Create a new flavor
router.post("/api/flavors", function (req, res) {
 hookahFlavors.create(["name", "category",  )
   res.json();
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

