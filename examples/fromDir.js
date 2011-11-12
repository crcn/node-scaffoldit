var scaffoldit = require('../');
require('colors');

scaffoldit({
	params: {
		'_src': __dirname + '/tpl/',
		'_dest': __dirname + '/out/'
	},
	input: {
		'name':  {
			msg: 'What is your name?',
			value: 'Craig'
		},
		'hasDog': '(confirm) Do you have a dog?'
	},
	build: scaffoldit.fromDir,
	complete: function(err, result) {
		
		console.log("DONE")
	}
});