var fs = require('fs'),
mustache = require('mustache');

module.exports = function(ops, src, callback) {
	
	if(typeof src == 'function') {
		
		callback = src;
		src = undefined;
	}

	if(!src) src = ops._src;

	fs.readFile(src, 'utf8', function(err, content) {
		
		callback(false, mustache.to_html(content, ops));
	});
	
}