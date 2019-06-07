require("dotenv").config();
let express = require("express");
let exphbs = require("express-handlebars");

let app = express();

let PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
let apiRoutes = require("./routes/apiRoutes");
app.use(apiRoutes);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
//////////////////////
module.exports = app;
