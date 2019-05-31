let hookahFlavors = require("../models/hookah_flavors.js");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
   
      res.render("index", {
      });
    });

  // Load table page and pass in a table by id
  app.get("/table/:id", function(req, res) {

      res.render("table", {
        id: req.params.id
      });
    });

  app.get("/reserve", function(req, res) {
    
      res.render("reserve", {
        
      });
    });

  app.get("/manager", function(req, res) {
    
      res.render("manager", {
        
      });
    });


 

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
