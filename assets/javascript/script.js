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

}


searchListButtons();