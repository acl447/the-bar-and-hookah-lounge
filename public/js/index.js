// Get references to page elements
let $reserveTable = $("#reserveTable");

// The API object contains methods for each kind of request we'll make
let API = {
  
  getTables: function() {
    return $.ajax({
      url: "api/tables",
      type: "GET"
    });
  },

  updateTable: function() {

    return $.ajax({
      url: "api/tables/" + id,
      type: "PUT",
      data: updatedTable
    }).then(
      function() {

        console.log("updated table");

        //Reload the manager page to get updated reservations list
        location.assign("/manager");
      }
    );
  },
  getFlavors: function() {

    return $.ajax({
      url: "api/flavors",
      type: "GET"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
let refreshTables = function() {
  API.getTables().then(function(data) {
    let $tables = data.map(function(table) {
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
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};


  });
};

// Add event listeners to the submit and delete buttons
$reserveTable.on("click", );
$exampleList.on("click", ".delete", handleDeleteBtnClick);
