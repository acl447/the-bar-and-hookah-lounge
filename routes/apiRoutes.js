let hookahFlavors = require("../models/hookah_flavors.js");
let reservations = require("../models/tables.js");
let waitList = require("../models/waitlist.js");
let express = require("express");
let router = express.Router();

// Get all reservations
router.get("/api/reservations", function (req, res) {
  console.log("get api/reservations was called");
  reservations.all(function (data) {
    // console.log(data);
    res.json(data);
    // res.json({ "reservationsList": data });
  });
});

router.put("/api/reservations/:id", function (req, res) {
  console.log("put api/reservations was called");
  console.log(req.body);
  var condition = "id = " + req.params.id;
  console.log("condition", condition);

  reservations.update(req.body, condition, function (data) {
    res.json({ "reservation": data });
    console.log("Reservation was made:");
    console.log(data);

  });
});

router.get("/api/waitlist", function (req, res) {
  console.log("get api/waitlist was called");
  waitList.all(function (data) {
    // console.log(data);
    res.json(data);
    // res.json({ "reservationsList": data });
  });
});

//Get all waitlist listings
router.delete("/api/waitlist", function (req, res) {
  console.log("delete api/waitlist was called");
  console.log("Delete Waitlist req: ", req.body);
  
  waitList.delete("id", req.body.clearWaitID, function (data) {
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

// Add flavor to flavor list
router.post("/api/flavors", function (req, res) {
  console.log("router.post api/flavors was called");
  hookahFlavors.create(Object.keys(req.body), Object.values(req.body), function (data) {

   res.json({ "flavorList": data });
  });
});

//Delete flavor from flavor list
router.delete("/api/flavors/:id", function (req, res) {

  console.log("router.delete api/flavors/:id was called");

  let flavorID = req.params.id;

  hookahFlavors.delete("id", flavorID, function (data) {

    res.json({ "flavorList": data});
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

