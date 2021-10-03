



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

searchListButtons();