let hookahFlavors = require("../models/hookah_flavors.js");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Table.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/table/:id", function(req, res) {
  
    db.then(function(dbTable) {
      res.render("table", {
        table: dbTable
      });
    });
  });

  app.get("/reserve", function(req, res) {
    
      res.render("reserve", {
        
      });
    });


 

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
