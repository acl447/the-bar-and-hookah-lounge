// Make sure we wait to attach our handlers until the DOM is fully loaded.
// $(function() {

// Get references to page elements
// let $reserveTable = $("#reserveTable");

//Global variables
let cocktails;
let cocktailName;
let description;
let cocktailImg;
let searchName;
let counter = 1;

// The API object contains methods for each kind of request we'll make

let API = {

  getTables: function (cb) {
    $.ajax({
      url: "api/reservations",
      type: "GET"
    }).then(function (data, textStatus, jqXHR) {
      console.log(data);
      cb(data);
      // console.log(jqXHR.responseText);
    });
  },
  updateTable: function () {

    return $.ajax({
      url: "api/tables/" + id,
      type: "PUT",
      data: updatedTable
    }).then(
      function () {

        console.log("updated table");

        //Reload the manager page to get updated reservations list
        location.assign("/manager");
      }
    );
  },
  getFlavors: function () {
    console.log("getFlavors called");

    return $.ajax({
      url: "api/flavors",
      type: "GET"
    });
  },
  randomCocktail: function () {
    $.ajax({
      url: "https://www.thecocktaildb.com/api/json/v1/1/random.php",
      method: "GET",
    }).then(function (response) {
      //console.log(response);

      cocktails = response.drinks;
      //console.log(cocktails);

      for (let i = 0; i < cocktails.length; i++) {
        cocktailName = cocktails[i].strDrink;

        let ingredients = [cocktails[i].strIngredient1, cocktails[i].strIngredient2,
        cocktails[i].strIngredient3, cocktails[i].strIngredient4, cocktails[i].strIngredient5,
        cocktails[i].strIngredient6, cocktails[i].strIngredient7, cocktails[i].strIngredient8,
        cocktails[i].strIngredient9, cocktails[i].strIngredient10];

        description = ingredients.filter(function (el) {
          return Boolean(el);
        }).join(", ");

        cocktailImg = cocktails[i].strDrinkThumb;

        console.log(cocktailName);
        console.log(description);
        console.log(cocktailImg);

        API.renderCocktails(cocktailImg, cocktailName, description);

        if (counter < 3) {
          counter++;
          window.setTimeout(API.randomCocktail, 1000);
        }
      };
    });
  },
  renderCocktails: function (cocktailImg, cocktailName, description) {
    $("#cocktails").prepend("<hr>");

    let descDrink = $("<p>");
    descDrink.addClass("description card-text");
    descDrink.attr("data-drink-description", description);
    descDrink.attr("id", "descColor");
    descDrink.text(description);
    $("#cocktails").prepend(descDrink);

    let drinkName = $("<h5>");
    drinkName.addClass("drinkName card-title text-center");
    drinkName.attr("data-drink-name", cocktailName);
    drinkName.attr("id", "cNameColor")
    drinkName.text(cocktailName);
    $("#cocktails").prepend(drinkName);

    let imgUrl = cocktailImg;
    let imgPage = $("<img>");
    imgPage.addClass("text-center img-fluid");
    imgPage.attr("src", imgUrl);
    imgPage.attr("id", "drinkPic");
    $("#cocktails").prepend(imgPage);
  }
};

// refreshExamples gets new examples from the db and repopulates the list
let refreshTables = function () {
  API.getTables().then(function (data) {
    let $tables = data.map(function (table) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();
  //   let reservationsList = ""
  //   if (!(example.text && example.description)) {
  //     alert("You must enter an example text and description!");
  //     return;
  //   }

  //   API.saveExample(example).then(function() {
  //     refreshExamples();
  //   });

  API.saveExample(example).then(function () {
    refreshExamples();
  });
};

//   });
// };


// Add event listeners to the submit and delete buttons
// $reserveTable.on("click");
// $exampleList.on("click", ".delete", handleDeleteBtnClick);

let refreshFlavors = function () {
  console.log("refresh flavors called");

  API.getFlavors().then(function (data) {
    console.log(data);

    let flavorList = "";
    data.flavorList.forEach(function (element) {
      flavorList += "<option value='" +
        element.name + "'>" + element.name + "</option>"
    });
    // console.log(flavorList);

    $("#flavor_list").html(flavorList);

  });
};

$(document).ready(function () {
  console.log("document ready called");

  $("#cocktails").load("/table/:id #cocktails li");
    $("#cocktails").empty();
    API.randomCocktail();

  /*$(".search").click(function () {
    $("ol").empty();
    getCocktailName();
  })*/

  refreshFlavors();

  $(".reserve-table").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    let flavorSel = $("#flavor_list");
    // console.log(flavorSel[0].selectedOptions[0].text);
    let opt = flavorSel[0].selectedOptions[0];
    // console.log(opt);


    let newReservation = {
      flavor: opt.text,
      name: $("#name").val().trim(),
      email: $("#email").val().trim(),
      phone: $("#phone").val().trim(),
    };

    API.getTables(function (result) {
      let tableList = result;
      console.log("New Reservation: " + JSON.stringify(newReservation));
      console.log("New Reservation - Name: " + newReservation.name);
      console.log(tableList);
      // console.log(tableList.responseJSON);


      // Send the POST request.
      // $.ajax("/api/cats", {
      //   type: "POST",
      //   data: newCat
      // }).then(
      //   function () {
      //     console.log("created new cat");
      //     // Reload the page to get the updated list
      //     location.reload();
      //   }
      // );
    });
  });


});
