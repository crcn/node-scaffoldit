### Example

```javascript

var scaffolding = require('scaffolding');


scaffolding({
	input: {
		name: "What is your name?",
		address: "What is your address?",
		hasDog: "(confirm) Do you have a dog?"
	},
	build: function(ops)
	{
		console.log(ops.name);
		console.log(ops.address);
		console.log(ops.hasDog);//true
	}
});

````

### Types of inputs

You can easily specify the type of input by adding `(type-of-input)` before the message. Like to:

````javascript

scaffolding({
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

scaffolding({
	
	input: {
		projectName: {
			msg: "What is your project name?",
			default: function(params, callback)
			{
				callback(50);
			}
		},
		projectSrc: {
			msg: "What is your project located?",
			default: '/usr/local/bin'
		}
	}
});

````

### Helpers

#### scaffolding.fromDir(params, src, dest)

scans the target directory for files, and replaces any template variables with the parameters given. The destination is where the files are written to.

````javascript

scaffolding({
	params: {
		projectName: "What is your project name?"
	}
})

````

Or if your lazy like me, you can do something like this:


scaffolding({
	input: {
		projectName: "What is your project name?",
		_src: "Where is your project located?",
		_dest: "Where do you want to write the project to?",
	},
	build: scaffolding.fromDir
})


