 var memes = [];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayMeme() {

        var meme = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + meme + "&api_key=d7cb41b658e34e0ab32378cc92cee4a6";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

        	console.log(response);
          // Creating a div to hold the movie
          var memeDiv = $("<div class='displayMeme'>");

          // Storing the rating data
          var rating = response.rating;

          // Creating an element to have the rating displayed
          var pOne = $("<p>").text("Rating: " + rating);

          // Displaying the rating
          memeDiv.append(pOne);


          // Retrieving the URL for the gif
          var imgURL = response.images.fixed_height_still;

          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);

          // Appending the image
          memeDiv.append(image);

          // Putting the entire movie above the previous movies
          $(".displayMeme").prepend(memeDiv);
        });

      }

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $(".buttons-view").empty();

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
          $(".buttons-view").append(a);
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
      $(document).on("click", ".movie", displayMeme);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();