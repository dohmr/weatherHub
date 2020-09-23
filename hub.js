$(function () {


  var appID = "319a7fd5607eadb36c7edf976e303334";


  var cities = [
    "San Diego",
    "Pago Pago",
    "Minneapolis",
    "Fredericksburg",
  ];


  function displayCityInfo(city) {

    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + appID + "&units=imperial";




    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {


      console.log(response);
      var iconUrl = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
      // var foreIcon = "https://openweathermap.org/img/w/" + foreResponse.list[i].weather[0].icon + ".png";

      var iconImg = $("<img>").attr("src", iconUrl);
      var lat = response.coord.lat;
      var lon = response.coord.lon;

      var uvQueryUrl = "https://api.openweathermap.org/data/2.5/uvi?";
      uvQueryUrl += "lat=" + lat;
      uvQueryUrl += "&lon=" + lon;
      uvQueryUrl += "&appid=" + appID;

      var forecastQueryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + appID + "&units=imperial";

      $("#city-name").text(response.name + "'s Current Weather");
      $("#weather-icon").empty().append(iconImg);
      $("#temp").text(response.main.temp + "°");
      $("#wind").text(response.wind.speed + " MPH");
      $("#humidity").text(response.main.humidity + "%");

      $.ajax({
        url: uvQueryUrl,
        method: "GET",
      }).then(function (uvResponse) {
        console.log(uvResponse);

        $("#uv-index").text(uvResponse.value);
      });

      $.ajax({
        url: forecastQueryUrl,
        method: "GET",
      }).then(function (foreResponse) {
        console.log(foreResponse);
        var d = new Date();


        for (var i = 0; i < 5; i++) {
          var foreIcon = "https://openweathermap.org/img/w/" + foreResponse.list[i].weather[0].icon + ".png";
          var foreImg = $("<img>").attr("src", foreIcon);
          $("#" + [i] + "date").text(d.getMonth() + 1 + "/" + d.getDate() + [i]);
          $("#" + [i] + "icon").empty().append(foreImg);
          $("#" + [i] + "temp").text(foreResponse.list[i].main.temp + "°");
          $("#" + [i] + "humid").text(foreResponse.list[i].main.humidity + "%");
        }
        // $("#uv-index").text(uvData.value);
      });

    });
  }



  $(document).on("click", ".city", function () {

    var city = $(this).attr("data-city");

    displayCityInfo(city);
  });



  function renderButtons() {
    // var city = $(this).attr("data-city");

    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of cities
    for (var i = 0; i < cities.length; i++) {

      var a = $("<button>");

      a.addClass("city btn btn-outline-primary btn-block");

      a.attr("data-city", cities[i]);
 
      a.text(cities[i]);




      $("#buttons-view").prepend(a);
      console.log(cities);
    }
  }
  $()



  //get input from search, store into localStorage
  $("#city-form").on("submit", function (event) {
    event.preventDefault();

    var cityId = $("#city-form").attr("id");
    var city = $("#city-input").val().trim();




    cities.push(city);

    if (city === "") {
      return;

    }
    localStorage.setItem(cityId, city);
    console.log(cityId, city);
    displayCityInfo(city);
    localStorage.getItem("#city-form")
    renderButtons();
  });

  // Calling the renderButtons function to display the initial buttons
  renderButtons();




});