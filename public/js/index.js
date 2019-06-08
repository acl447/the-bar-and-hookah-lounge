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
    });
  },

  getWaitlist: function (cb) {
    $.ajax({
      url: "api/waitlist",
      type: "GET"
    }).then(function (data, textStatus, jqXHR) {
      console.log(data);
      cb(data);
    });
  },

  updateTable: function (newRes, id) {
    console.log("New Reservation");
    console.log(newRes);

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

  deleteWaitlist: function (clearWaitID) {
    console.log("postWaitlist called");

    return $.ajax({
      url: "api/waitlist",
      type: "DELETE",
      data: {clearWaitID: clearWaitID}
    });
  },

  getFlavors: function () {
    console.log("getFlavors called");

    return $.ajax({
      url: "api/flavors",
      type: "GET"
    });
  },

  createFlavor: function (newFlavor) {

    console.log("createFlavor called");

    return $.ajax({
      url: "api/flavors",
      type: "POST",
      data: newFlavor
    }).then(
      function () {
        console.log("created new flavor");
        // Reload the page to get the updated list
        // location.reload();
      }
    );
  },

  deleteFlavor: function (id) {

    console.log("deleteFlavor called");

    // Send the DELETE request.
    return $.ajax("/api/flavors/" + id, {
      type: "DELETE"
    }).then(
      function () {
        console.log("deleted id ", id);

      }
    );


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

let addToWaitList = function (newRes) {


};

$(document).ready(function () {
  console.log("document ready called");

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
      customerName: $("#name").val().trim(),
      customerEmail: $("#email").val().toString().trim(),
      phoneNumber: $("#phone").val().toString().trim(),
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
        API.postWaitlist(newReservation);
        alert("You have been put on the waitlist")
      } else {
        let openTableID = search(tableList, "reserved", 0);
        console.log(openTableID.id);
        newReservation.reserved = 1;
        API.updateTable(newReservation, openTableID.id);
      }
    });
  });

  $(".clear-reservation").on("click", function (event) {

    event.preventDefault();
    
    let tableID = event.target.dataset.id;

    let clearReservation = {
      flavor: null,
      customerName: null,
      customerEmail: null,
      phoneNumber: null,
      reserved: 0
    };

        API.updateTable(clearReservation, tableID);
        location.reload();
  });

  $(".waitlist-reservation").on("click", function (event) {

    event.preventDefault();
    
    let tableID = event.target.dataset.id;

    API.getWaitlist(function (result) {
      let waitList = result;
      if (jQuery.isEmptyObject(waitList)){
        alert("The Waitlist is Empty")
      } else {
        let waitID = waitList[0].id;
        let newReservation = {
          flavor: waitList[0].flavor,
          customerName: waitList[0].customerName,
          customerEmail: waitList[0].customerEmail,
          phoneNumber: waitList[0].phoneNumber,
          reserved: 1
        };
        API.updateTable(newReservation, tableID);
        API.deleteWaitlist(waitID);
        location.reload();
      }
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

    API.createFlavor(newFlavor);
    // Reload the page to get the updated list
    location.reload();

  });

  $(".del-flavor").on("click", function (event) {
    let id = $(this).data("id");

    console.log("id of flavor to delete:", id);

    API.deleteFlavor(id);
    // Reload the page to get the updated list
    location.reload();
  });

});
