$(document).ready(function() {

	$('#photo-search').submit(function(e) {

		e.preventDefault();

		var photo = $("#search").val(),
		flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",

		data = {
			tags: photo,
			format: "json",
		};

		function displayPhotos(data) {
			var html = "";

			$("#submit").val("Search");
			$("#search").attr("type", "search");

			$.each(data.items, function(i, photo) {
				html += "<li class='grid-25 tablet-grid-50'>";
				html += 	"<a href='" + photo.link + "'>";
				html += 		"<img src='" + photo.media.m + "'>";
				html += 	"</a>";
				html +=	"</li>";
			})

			if (data.items.length === 0) {
				$("#photos").html(
					"<li>Could not find any photos. Try a different search term</li>"
				);
			} else {
				$("#photos").html(html);
			}

		};

		$("#submit").val("Searching...");

		$.getJSON(flickrAPI, data, displayPhotos);

	})

})
