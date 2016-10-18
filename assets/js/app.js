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
	getHtml: function(url) {
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
	}
};

// // // event listeners // // //

$('form#form_new_scrape').on('submit', function(e){
	e.preventDefault();
	var url = $('input#input_url').val();
	url !== null ? app.getHtml(url) : console.error('please enter a url');
});