var newInput = false;


$("#searchButton").on("click", () => {
  var searchInput = $("#userInput").val();
  newInput = true;
  openWeatherData(searchInput);
  $("#userInput").val("");
});

$("#searchHistory").on("click", (event) => {
  if(event.target.matches("button")){
    var searchInput = event.target.textContent;
    newInput = false;
    openWeatherData(searchInput);
  }
});


function searchListButtons(searchInput) {
  var cityButton = $("<button>")
  cityButton.text(searchInput);
  cityButton.attr("class", " btn btn-block searchListButton");
  cityButton.attr("cityData", searchInput);
  $("#searchHistory").prepend(cityButton);
}

function openWeatherData(searchInput){
  var openWeatherKey = "60c51965c01263ac96f2d86f2817986b";
  var openWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&units=imperial&appid=" + openWeatherKey;

  $.ajax({
    url: openWeatherURL,
    method: "GET"
   })
   .then((response) =>{
      var city = response.name;
      if(newInput){
        searchListButtons(city);
      };
      $(".weeklyForecast").remove();

      $("#cityName").text((city));
      $("#cityName").append($("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"));
      $("#temperature").html("Temperature: "+(response.main.temp) + '9&#176' + "F");
      $("#humidity").html("Humidity: " +(response.main.humidity) + "%");
      $("#windSpeed").html("Wind Speed: " +(response.wind.speed) + " MPH");
      var lattitude = response.coord.lat;
      var longitude = response.coord.lon;
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/uvi?lat="+ lattitude + "&lon=" + longitude + "&appid=" + openWeatherKey,
        method: "GET"
      }).then((response) =>{
        var uvIndex = response.value;
        $("#uvIndex").text("UV Index: ");
        if (uvIndex < 3){
             $("#uvIndex").append(
               $("<div>").attr("class", ".low").text(uvIndex)
              );
        }
        else if(uvi < 6){
             $("#uvIndex").append(
               $("<div>").attr("class", ".moderate").text(uvIndex)
             );
        }
        else if(uvIndex < 8){
             $("#uvIndex").append(
               $("<div>").attr("class", ".high").text(uvIndex)
             );
        }
        else{
             $("#uvIndex").append(
               $("<div>").attr("class", ".veryHigh").text(uvIndex)
             );
        };
      });
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lattitude + "&lon=" + longitude + "&units=imperial&exclude=current,minutely,hourly,alerts&appid=" + openWeatherKey,
        method: "GET"
      }).then((response) => {
        var forecastArray = response.daily;
        for(let i = 1; i < 6; i++){
          var dailyForecastDiv = $("<div>").attr("class", ".weeklyForecast");
          let date = String(moment().add(i, 'day').format('L'));

}


searchListButtons();