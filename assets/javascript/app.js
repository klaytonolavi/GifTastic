var memes = [];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayMeme() {

        var meme = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + meme + "&api_key=d7cb41b658e34e0ab32378cc92cee4a6&limit=5";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

        	console.log(response);

        var results = response.data;
          // Creating a div to hold the movie
          // var memeDiv = $("<div class='displayMeme'>");

        	var memeDiv = $("<div class='memeDiv'>");
          

          // loop over each image object in the results array
          for ( var i = 0; i < results.length; i++ ) {
            var memeImg = $("<img>");
            memeImg.attr({
              // set initial source to the still image and set other attributes to
              // store the urls for the still (paused) and animated images as well
              // as the current state
              'src': results[i].images.fixed_height_still.url,
              'data-still': results[i].images.fixed_height_still.url,
              'data-animated': results[i].images.fixed_height.url,
              'data-state': 'still'
            });
            memeDiv.append(memeImg);
          }

           
          
          // --------------------------------------------------------

          $("#meme-display").prepend(memeDiv);

 
        });

      }

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < memes.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("meme");
          // Adding a data-attribute
          a.attr("data-name", memes[i]);
          // Providing the initial button text
          a.text(memes[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a movie button is clicked
      $("#add-meme").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var meme = $("#meme-input").val().trim();

        // Adding movie from the textbox to our array
        memes.push(meme);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

		
      });

      // Adding a click event listener to all elements with a class of "movie"
      $(document).on("click", ".meme", displayMeme);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

	$("memeImg").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
