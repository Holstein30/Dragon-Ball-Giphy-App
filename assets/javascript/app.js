$(document).ready(function() {

// Variables

var names = ["Goku", "Vegeta", "Killua"];

createButtons();

// Add buttons 

function createButtons() {

	// Delete prior buttons to prevent repeats

	$("#buttons").empty();

		// Loop through names array

		for (var i = 0; i < names.length; i++) {

	  	// Generate buttons for each name & add class & data then append to buttons div

	  	var b = $("<button>");

	  	b.addClass("btn-success selector");

	  	b.attr("data-name", names[i]);

	  	b.text(names[i]);

	  	$("#buttons").append(b);
	}
}

function run() {

	var search = $(this).attr("data-name");

	// Delete previous gifs

	$("#gifs").empty();

	var key = "HCF4P1jvFZaxfD6G0XdeG1DyVc0B168L";
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + key + "&limit=10";

	var counter = 0;

	$.ajax ({
		url: queryURL,
		method: "GET"
	}).done(function(data){
		console.log(data);

		for (var i = 0; i < 10; i++) {

			counter++;

			var imgDiv = $("<img>");

			imgDiv.addClass("gif")

			var rating = data.data[i].rating;

			var p = $("<p>").text("Rating: " + rating);

			// Data types for play/pause use & source url

			imgDiv.attr("dataStill", data.data[i].images.fixed_height_still.url);
			imgDiv.attr("dataAnimate", data.data[i].images.fixed_height.url);
			imgDiv.attr("dataState", "still");	
			imgDiv.attr("src", data.data[i].images.fixed_height_still.url);

			var newDiv = $("<div>");

			$("#gifs").append(newDiv);

			newDiv.addClass("col-4");

			newDiv.append(p);

			newDiv.append(imgDiv);

		}

		// Add play/pause for gifs

		$(".gif").on("click", function() {

			console.log("hi");

		    var state = $(this).attr("dataState");

		    if (state === "still") {
		    	$(this).attr("src", $(this).attr("dataAnimate"));
		        $(this).attr("dataState", "animate");
		    } 
		    else {
		        $(this).attr("src", $(this).attr("dataStill"));
		        $(this).attr("dataState", "still");
		    }
		});
	}); 

}

// Add buttons from user input

$("#addButton").on("click", function(event) {

 	event.preventDefault();

	// Grab user input

	var userInput = $("#userInput").val().trim();

	// Add input to names array

	names.push(userInput);

	console.log(names);

	createButtons();

});

// Event listener for button clicks to display gifs

$(document).on("click", ".selector", run);

});

