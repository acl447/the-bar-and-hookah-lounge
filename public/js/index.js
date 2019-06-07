// Make sure we wait to attach our handlers until the DOM is fully loaded.
// $(function() {

// Get references to page elements
// let $reserveTable = $("#reserveTable");

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
  updateTable: function (newRes) {

    return $.ajax({
      url: "api/reservations/" + id,
      type: "PUT",
      data: newRes
    }).then(
      function () {

        console.log("updated table");

        //Reload the manager page to get updated reservations list
        // location.assign("/manager");
      }
    );
  },

  postWaitlist: function (newRes) {
    console.log("postWaitlist called");

    return $.ajax({
      url: "api/waitlist",
      type: "POST",
      data: newRes
    });
  },
  getFlavors: function () {
    console.log("getFlavors called");

    return $.ajax({
      url: "api/flavors",
      type: "GET"
    });
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

let search = function (myArray, nameKey, value) {
  
  for (var i = 0; i < myArray.length; i++) {
    console.log(myArray[i]);
    // console.log(nameKey);        
    // console.log(myArray[i].nameKey);    
    if (myArray[i][nameKey] === value) {
      return myArray[i];
    }
  }
};

let addToWaitList = function (newRes){


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

      let resTableCount = 0;
      tableList.forEach(function (element) {
        resTableCount += element.reserved;
      });
      console.log(resTableCount);

      if (resTableCount === tableList.length) {
        API.postWaitList(newReservation)
      } else {
        let openTableID = search(tableList, "reserved", 0);
        console.log(openTableID);
      }

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

  $(".add-flavor").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();




    let newFlavor = {
      name: $("#flavor-name").val().trim(),
      category: $("#category").val().trim(),
      description: $("#description").val().trim(),
      quantity: $("#quantity").val().trim()
    };

    console.log("New Flavor: " + JSON.stringify(newFlavor));
    console.log("New Flavor - Name: " + newFlavor.name);

    // Send the POST request.
    $.ajax("/api/flavors", {
      type: "POST",
      data: newFlavor
    }).then(
      function () {
        console.log("created new flavor");
        // Reload the page to get the updated list
        location.reload();
      }
    );

  });

  $(".del-flavor").on("click", function(event) {
    let id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/flavors/" + id, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted id ", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

});
