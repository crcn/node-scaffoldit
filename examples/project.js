var scaffoldit = require('../');

scaffoldit({
	params: {
		'_src': __dirname + '/tpl/hello.txt'
	},
	input: {
		'name': 
		{
			msg: 'What is your name?',
			value: function(ops, callback)
			{
				//sim async
				setTimeout(function()
				{
					callback('Craig');
				}, 500);
			}
		},
		'hasDog': '(confirm) Do you have a dog?'
	},
	build: scaffoldit.fromFile,
	complete: function(err, result) {
		
		console.log(result)
	}
})