var app = {

	tracks: [],

	init: function() {
		_.templateSettings.variable = 'track'; 
			app.template = _.template(
			$('script.template').html()
		);
	},
	
	insertExample: function(url) {
		$('input#input_url').val(url);
	},

	generateTrackId: function() {
		return Math.random() * 1000000000000000000;
	},

	saveTracks: function(data) {
		_.each(data, function(elem) {
			elem.id = app.generateTrackId();
			elem.download = true;
			app.tracks.push(elem);
		});
	},

	renderTracks: function() {
		_.each(app.tracks, function(elem) {
			$('#tracks').append(app.template(elem));
		});
	},

	getTrackListing: function(url) {
		$.ajax({
			url: '/scrape',
			type: 'GET',
			data: {url: url},
			success: function(data) {
				app.tracks = [];
				$('#tracks').html('');
				app.saveTracks(data);
				app.renderTracks();
			},
			error: function(err) {
				console.error(err);
			}
		});
	},

	downloadTracks: function() {
		$.ajax({
			url: '/scrape',
			type: 'POST',
			data: {tracks: JSON.stringify(app.tracks)},
			success: function(data) {
			},
			error: function(err) {
				console.error(err);
			}
		});
	}
};

// // // event listeners // // //
$('form#form_new_scrape').on('submit', function(e){
	e.preventDefault();
	var url = $('input#input_url').val();
	app.getTrackListing(url);
});

$('body').on('change', 'input[type="checkbox"]', function(e) {
	var trackId = $(this).val();
	_.each(app.tracks, function(elem) {
		if (trackId == elem.id) {
			elem.download = ( $(this).prop('checked') ? true : false );
		} 
	});
});