

function searchListButtons(searchInput) {
  var cityButton = $("<button>")
  cityButton.text(searchInput);
  cityButton.attr("class", " btn btn-block searchListButton");
  cityButton.attr("cityData", searchInput);
  $("#searchHistory").prepend(cityButton);
}

searchListButtons();