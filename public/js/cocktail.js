//Global variables
let cocktails;
let cocktailName;
let description;
let cocktailImg;
let searchName;
let counter = 1;

let cocktailObj = {
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

                cocktailObj.renderCocktails(cocktailImg, cocktailName, description);

                if (counter < 3) {
                    counter++;
                    window.setTimeout(cocktailObj.randomCocktail, 1000);
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

$("#cocktails").load("/table/:id #cocktails li");
$("#cocktails").empty();
cocktailObj.randomCocktail();