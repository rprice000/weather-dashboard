

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



searchListButtons();