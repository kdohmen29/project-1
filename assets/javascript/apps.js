$("#loading").hide();
$("#submit").on("click", function () {
    event.preventDefault();
    $("#results").empty();
    $("#loading").show()
    // Get the users position and then call the getPosition function
    navigator.geolocation.getCurrentPosition(getPosition);
    // Called when a user allows us to access their position

    function getPosition(position) {
        // log the position object
        console.log(position);
        // store the latitued and longitude into variables
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        console.log(lat, lon);
        // pass the latitude and longitude into a function that searches for restuarants close by
        googlePlacesSearch(lat, lon);
    }

    // find restuarants within a 12.42 mile(20 km) radius of the lat lon passed in
    function googlePlacesSearch(lat, lon) {
        // setup proxy
        var proxyUrl = "https://cors-anywhere.herokuapp.com/";
        // add proxy url to the google apis url


        var foodType = $("#food-type").val().trim();
        console.log(foodType);
        $("#food-type").val("");
        var queryURL = proxyUrl + "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lon + "&radius=10000&type=restaurant&keyword=" + foodType + "&key=AIzaSyB3mWQO5pN0C9zmp5kRAD3H10NYKVv3ohA"
        // create the ajax request
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            $("#loading").hide()
            //   when the request returns log the response
            console.log(response);
            // run the add to page funtion to throw results (inside the response object) onto our page
            addToPage(response.results);
        });
    }

});

// This will add all of the results ont our page
function addToPage(data) {
    // create a div to contain the results
    var div = $("<div>");
    // for each result do the following
    data.forEach(restaurant => {
        // grab the address out of the restuarnt
        var address = restaurant.vicinity;
        // grab the name of the restaurant and create and H1 with the name as text
        var title = $("<h1>").text(restaurant.name);
        // append the restaurant name to the container div
        div.append(title);
        // for each entry in restaurant photos
        restaurant.photos.forEach(photo => {
            // grab the html attrubution (an a tag in string form)
            var aTag = photo.html_attributions[0];
            // parse the string into html
            var link = $.parseHTML(aTag)[0];
            // set the newly parsed a tag's inner html to be the address of the restaurant 
            link.innerHTML = address;
            // append that link to the container div
            div.append(link);
        })
    });
    // append the container div to the root div in our html
    $("#results").append(div);
}

