 // Initial food array
 var foodArr = ["Pizza", "Hot Dog", "Cheese", "Taco"];
 function displayFoodInfo() {
     //use AJAX to access giphy API
     var apiKey = "N4vdINy0iHjn7y7LkEZMTCWHbQbVhXRQ";
     var food = $(this).attr("data-name");
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=" + apiKey;
     $("#gifPlace").empty();
     $.ajax({
         url: queryURL,
         method: "GET"
     })
         //iterates through JSON response and appends gifs to page
         .done(function (response) {
             var results = response.data;
             for (var i = 0; i < results.length; i++) {
                 var gifDiv = $('<div class="gif">')
                 var foodImage = $('<img src=' + results[i].images.fixed_height_still.url + ' data-still=' +
                     results[i].images.fixed_height_still.url + ' data-animate=' +
                     results[i].images.fixed_height.url + ' data-state="still" class="foodImage">');

                 gifDiv.append(foodImage);
                 $('#gifPlace').append(gifDiv);
             }
         });
 }

 //uses data-still/data-animate states to animate/still gifs on click
 function imageMove() {
     var state = $(this).attr("data-state");
     if (state == "still") {
         $(this).attr("src", $(this).data("animate"));
         $(this).attr("data-state", "animate");
     } else {
         $(this).attr("src", $(this).data("still"));
         $(this).attr("data-state", "still");
     }
 }

 //puts button on page and adds data attribute
 function renderButtons() {
     $("#foodView").empty();
     for (var i = 0; i < foodArr.length; i++) {
         var a = $("<button>");
         a.addClass("food");
         a.attr("data-name", foodArr[i]);
         a.text(foodArr[i]);
         $("#foodView").append(a);
     }
 }

 $("#addFood").on("click", function (event) {
     event.preventDefault();
     var newFood = $("#foodInput").val().trim();
     foodArr.push(newFood);
     renderButtons();
 });


 //on click event listeners
 $(document).on("click", ".food", displayFoodInfo);
 $(document).on("click", ".foodImage", imageMove);
 renderButtons();