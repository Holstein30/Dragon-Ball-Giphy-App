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

function run(search) {

	// Delete previous gifs

	$("#gifs").empty();

	var key = "HCF4P1jvFZaxfD6G0XdeG1DyVc0B168L";
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + key + "&limit=10";

	$.ajax ({
		url: queryURL,
		method: "GET"
	}).done(function(data){
		console.log(data);

		for (var i = 0; i < 10; i++) {

			var imgDiv = $("<img>");

			var rating = data.data[i].rating;

			var p = $("<p>").text("Rating: " + rating);

			imgDiv.attr("src", data.data[i].images.fixed_height.url);

			$("#gifs").append(p);

			$("#gifs").append(imgDiv);

		}
	}); 

}

$(".selector").on("click", function() {
	var search = $(this).attr("data-name");
	run(search);
});

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

});

