var fs = require('fs'),
mustache = require('mustache'),
fromFile = require('./fromFile');

module.exports = function(ops, src, dest) {
	
	var callback = function(){};
	
	if(typeof src == 'function') {
		
		callback = src;
		src = undefined;
	}

	if(!src) src = ops._src;
	if(!dest) dest = ops._dest;
	
	
	
	fromFile(ops, function(err, content)
	{
		fs.writeFile(dest, content, callback);
	})
}
