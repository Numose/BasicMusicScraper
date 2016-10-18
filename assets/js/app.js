var app = {
	init: function() {
		_.templateSettings.variable = 'track'; 
			app.template = _.template(
			$('script.template').html()
		);
	},
	
	insertExample: function(url) {
		$('input#input_url').val(url);
	},

	renderTracks: function(data) {
		_.each(data, function(elem) { $('#tracks').append(app.template(elem)); });
	},

	getTrackListing: function(url) {
		$.ajax({
			url: '/scrape',
			type: 'GET',
			data: {url: url},
			success: function(data) {
				app.renderTracks(data);
			},
			error: function(err) {
				console.error(err);
			}
		});
	},

	downloadTracks: function() {
		// TODO: arguments to accecpt url's; persist on backend somehow instead of passing back huge json thing?
		$.ajax({
			url: '/scrape',
			type: 'POST',
			data: {url: 'http://media.mmo-champion.com/images/news/2016/september/music/MUS_71_KarazhanGameMansHall_Walk_01.mp3'},
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