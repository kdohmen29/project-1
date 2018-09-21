// Get the users position

function getPosition(position){
    console.log(position);
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    yelpSearch(lat, lon);
    console.log(lat,lon);
}

function yelpSearch (lat, lon) {
    var queryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+ lat +","+ lon +"&radius=50&type=restaurant&keyword=Pizza&key=AIzaSyB3mWQO5pN0C9zmp5kRAD3H10NYKVv3ohA"
    $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function(response) {
        console.log(response);
      });
}
navigator.geolocation.getCurrentPosition(getPosition);





//API Key for google places
var apiKey = AIzaSyAkOtiqPiRW-e8Ez-dYbPv3tMN6_v6Q5qE;


