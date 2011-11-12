
### What's this?

A library which allows to you very easily take input from a user, and use that data to build stuff. Like so: 


```javascript

var scaffoldit = require('../');
require('colors');

scaffoldit({
	
	/**
	 * another place to put default values
	 */
	
	params: {
		'_src': __dirname + '/tpl/hello.mu.txt'
	},
	
	/**
	 * input required by the user
	 */
	
	input: {
		'name': {
			msg: 'What is your name?',
			value: 'Craig'
		},
		'hasDog': '(confirm) Do you have a dog?'
	},
	
	/**
	 * called after gathering *all* input data - 
	 * builds the stuff
	 */
	
	build: function(ops, next) {
		
		console.log('Building template...'.grey);
		
		scaffoldit.fromFile(ops, next);
	},
	
	/**
	 * called after the entire build process is complete
	 */
	
	complete: function(err, result) {
		
		console.log(result.green);
	}
});

````

The hello.mu.txt [mustache](https://github.com/janl/mustache.js) template looks like:


````text

hello {{name}}!

{{#hasDog}}
You have a dog.
{{/has}}

{{^hasDog}}
You do NOT have a dog.
{{/hasDog}}

````

And the result is: 

![Alt example](http://i.imgur.com/3Q9Fa.png)


### scaffoldit(ops)

Options include:

- `params` - Default parameter values to pass onto the build callback.
- `input` - Inputs that require a value from the user.
	- `[param_name]` - The parameter name for the given input.
		- `msg` - The message to display to the user.
		- `default` - The optional default value to use for the param. Can be a value, or callback.
		- `type` - Optional param for the type of input.
- `build` - The build function for the parameters given.
- `complete` - Called once the build is complete.


### Types of inputs

You can easily specify the type of input by adding `(type-of-input)` before the message. Like to:

````javascript

scaffoldit({
	input: {
		username: "(prompt) Username:",
		password: "(password) Password:",
		hasFriends: "(confirm) Do you have any friends?"
	}
});

````

`(prompt)` is the default option if you omit the type of input.


### Default Parameters

````javascript

scaffoldit({
	
	input: {
		projectName: {
			msg: "What is your project name?",
			default: function(params, callback)	{ 
				
				callback(50);
			}
		},
		projectSrc: {
			msg: "Where is your project located?",
			default: '/usr/local/bin'
		}
	}
});

````


### scaffoldit.fromDir(params, src, dest)

Scans the target directory for [mustache](https://github.com/janl/mustache.js) templates, and replaces any template variables with the parameters given. The destination is where the files are written to. Make sure to set the *name* of the template file to something like `my-file.tpl.html`, or `my-file.mu.html`.

Note that `tpl`, and `mu` are removed in the destination file.

````javascript

scaffoldit({
	input: {
		projectName: "What is your project name?"
	},
	build: function(ops, next) {
		
		scaffoldit.fromDir(ops, '/path/to/input/dir','/path/to/output/dir');
	},
	complete: function() {
		//...
	}
})

````

Or you can do something like this:

````javascript

scaffoldit({
	params: {
		'_src': '/path/to/input/dir',
		'_dest': '/path/to/output/dir'
	},
	input: {
		projectName: "What is your project name?"
	},
	build: scaffoldit.fromDir,
	complete: function() {
		//...
	}
});

````


### scaffoldit.fromFile(params, templateSrc, callback)

loads the target [mustache](https://github.com/janl/mustache.js) template file and fills it with the parameters given. Again, make sure to use this format `my-file.mu.format`, or `my-file.tpl.format` for consistency.

````javascript

scaffoldit({
	input: {
		name: {
			msg: "What's your name?",
			default: "Craig"
		},
		_src: {
			msg: "Where is the template?",
			default: "/path/to/template.file"
		},
		build: scaffoldit.fromFile,
		complete: function(err, content) {
			
			console.log(content);
		}

	}
});

````


