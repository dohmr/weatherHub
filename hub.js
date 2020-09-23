$(function () {


  var appID = "319a7fd5607eadb36c7edf976e303334";

  // Initial array of movies
  var cities = [
    "San Diego",
    "Pago Pago",
    "Minneapolis",
    "Fredericksburg",
  ];

  // displayMovieInfo function re-renders the HTML to display the appropriate content
  function displayCityInfo(city) {
    // var city = $(this).attr("data-name");
    var queryURL =
      "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + appID + "&units=imperial";



    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      // Creates a div to hold the movie
      // var movieDiv = $("#currentCity");
      // Retrieves the Rating Data
      console.log(response);
      var iconUrl = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";

      // create an img element and set its src equal to the icon url.
      var iconImg = $("<img>").attr("src", iconUrl);
      var lat = response.coord.lat;
      var lon = response.coord.lon;
  
      var uvQueryUrl = "https://api.openweathermap.org/data/2.5/uvi?";
      uvQueryUrl += "lat=" + lat;
      uvQueryUrl += "&lon=" + lon;
      uvQueryUrl += "&appid=" + appID;

      // empty div #weather-icon and append the weather icon
      $("#weather-icon").empty().append(iconImg);


      // Creates an element to have the rating displayed
      // $("#currentCity").empty();
      $("#city-name").text(response.name + "'s Current Weather");
      $("#temp").text(response.main.temp + "°");
      $("#wind").text(response.wind.speed + " MPH");
      $("#humidity").text(response.main.humidity + "%");
      // $("<img>").attr("src", response.Poster).attr("alt", "Movie Poster")
      // movieDiv.append(titleTDiv, yearTDiv, actorTDiv, posterDiv);

      // $("#currentCity").prepend(movieDiv);
      $.ajax({
        url: uvQueryUrl,
        method: "GET",
      }).then(function (uvData) {
        console.log(uvData);
        // display the uv data
        $("#uv-index").text(uvData.value);
      });
      // Displays the rating
      // Retrieves the release year
      // Creates an element to hold the release year
      // Displays the release year
      // Retrieves the plot
      // Creates an element to hold the plot
      // Appends the plot
      // Creates an element to hold the image
      // Appends the image
      // Puts the entire Movie above the previous movies.
    });
  }
  $(document).on("click", ".city", function () {
    // get the name of the city using the data-city attribute of the clicked
    // element
    var city = $(this).attr("data-city");

    // send ajax request for weather and display it
    displayCityInfo(city);
  });

  // Function for displaying movie data
  function renderButtons() {
    var city = $(this).attr("data-city");
    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of movies
    for (var i = 0; i < cities.length; i++) {
      // Then dynamicaly generates buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Add type for bootstrap
      // a.attr("type", "button");
      // Adds a class of movie to our button
      a.addClass("city btn btn-outline-primary btn-block");
      // Added a data-attribute
      a.attr("data-city", cities[i]);
      // Provided the initial button text
      a.text(cities[i]);

      // Added the button to the buttons-view div
      $("#buttons-view").prepend(a);

    }
  }

  // This function handles events where the add movie button is clicked
  $("#city-form").on("submit", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var cityId = $("#city-form").attr("data-city");
    var city = $("#city-input").val().trim();

    // The movie from the textbox is then added to our array
    cities.push(city);

    if (city === "") {
      return;

    }
    localStorage.setItem(cityId, city);
    console.log(cityId, city);
    displayCityInfo(city);
    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // Adding click event listeners to all elements with a class of "movie"
  // $(document).on("click", ".city", displayMovieInfo);

  // Calling the renderButtons function to display the initial buttons
  renderButtons();

  // displayCityInfo();




  //******************THINGS TO DO ************************************* */
  // FORECAST API CALL 
  // api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

  // UVindex . url api.openweathermap.org/data/2.5/uvi? + lat + lon + apikey

  // use daily planner moment() to create varaiable for 5 day.
  // also instructor stream 

  // take out preset buttons. keep array for local storage. 
  //

});