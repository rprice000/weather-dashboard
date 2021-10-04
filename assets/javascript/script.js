var cityInput = false;


$("#searchButton").on("click", () => {
  var searchInput = $("#userInput").val();
  cityInput = true;
  openWeatherData(searchInput);
  $("#userInput").val("");
});




$("#searchHistory").on("click", (event) => {
  if(event.target.matches("button")){
    var searchInput = event.target.textContent;
    cityInput = false;
    openWeatherData(searchInput);
  }
});


function searchListButtons(searchInput) {
    var cityButton = $("<button>")
    cityButton.text(searchInput);
    cityButton.attr("id", " btn btn-block searchListButton");
    cityButton.attr("cityData", searchInput);
    $("#searchHistory").prepend(cityButton);
}

function openWeatherData(searchInput){
  var openWeatherKey = "60c51965c01263ac96f2d86f2817986b";
  var openWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&units=imperial&appid=" + openWeatherKey;

  $.ajax({url: openWeatherURL, method: "GET"})
   .then((response) =>{
      var city = response.name;
     
      if(cityInput){
        searchListButtons(city);
      };
      $("#forecastCards").remove();
      $("#cityName").text((city));
      $("#cityName").append($("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"));
      $("#temperature").html("Temperature: "+ (response.main.temp).toFixed(1) + '9&#176'+"F");
      $("#humidity").html("Humidity: " + (response.main.humidity) + "%");
      $("#windSpeed").html("Wind Speed: " + (response.wind.speed) + " MPH");
      var lattitude = response.coord.lat;
      var longitude = response.coord.lon;
      $.ajax({url: "https://api.openweathermap.org/data/2.5/uvi?lat="+ lattitude + "&lon=" + longitude + "&appid=" + openWeatherKey, method: "GET"})
        .then((response) =>{
          var uvIndexEl = response.value;
          $("#uvIndex").text("UV Index: ");
          if (uvIndexEl < 3){
             $("#uvIndex").append($("<div>").attr("id", "low").text(uvIndexEl));
          }
          else if(uvIndexEl < 6){
             $("#uvIndex").append($("<div>").attr("id", "moderate").text(uvIndexEl));
          }
          else if(uvIndexEl < 8){
             $("#uvIndex").append($("<div>").attr("id", "high").text(uvIndexEl));
          }
          else{
             $("#uvIndex").append($("<div>").attr("id", "veryHigh").text(uvIndexEl));
          };
      });
      $.ajax({url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lattitude + "&lon=" + longitude + "&units=imperial&exclude=current,minutely,hourly,alerts&appid=" + openWeatherKey, method: "GET"})
        .then((response) => {
          var forecastArray = response.daily;
          for(var i = 1; i < 6; i++){
            var dailyForecastDiv = $("<div>").attr("id", "forecastCards");
            var date = String(moment().add(i, 'day').format('L'));
            dailyForecastDiv.prepend($("<p>").text(date));
            dailyForecastDiv.append($("<img>").attr("src", "https://openweathermap.org/img/wn/" + forecastArray[i].weather[0].icon + "@2x.png"));
            dailyForecastDiv.append($("<p>").html("Temperature: "+ forecastArray[i].temp.day.toFixed(1) + '9&#176' + "F"));
            dailyForecastDiv.append($("<p>").text("Humidity: "+ forecastArray[i].humidity + "%"));
            $("#weeklyForecast").append(dailyForecastDiv);
          }; 
        });
   });
};

openWeatherData();
searchListButtons();