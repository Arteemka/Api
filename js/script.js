let findInput = document.getElementsByClassName("find-item-text")[0];
const buttonFind = document.getElementsByClassName("find-item-button")[0];

buttonFind.addEventListener("click", function() {
  fetch(
    `https://api.nestoria.co.uk/api?encoding=json&pretty=1&action=search_listings&country=uk&listing_type=rent&page=1&place_name=${findInput.value}`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(date) {
      console.log("Request successful", date.response.listings);
    })
    .catch(function(error) {
      console.log("Request failed", error);
    });
});
