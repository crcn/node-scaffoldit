var scaffoldit = require('../');
require('colors');

scaffoldit({
	params: {
		'_src': __dirname + '/tpl/hello.txt'
	},
	input: {
		'name': 
		{
			msg: 'What is your name?',
			value: 'Craig'
		},
		'hasDog': '(confirm) Do you have a dog?'
	},
	build: function(ops, next)
	{
		console.log('Building template...'.grey);
		
		scaffoldit.fromFile(ops, next);
	},
	complete: function(err, result) {
		
		console.log(result.green);
	}
});