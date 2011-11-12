var findit = require('findit'),
fromFile = require('./fromFile'),
path = require('path'),
mkdirp = require('mkdirp'),
fs = require('fs');

module.exports = function(ops, src, dest) {
	var next;
	
	if(typeof src == 'function') {
		
		next = src;
		src = undefined;
	}
	
	if(!src) src = ops._src;
	if(!dest) dest = ops._dest;
	
	var files = findit.findSync(src);
	
	var numWriting = files.length;
	
	files.forEach(function(file) {
		 
		var relPath = file.replace(src,''),
		newPath = dest + relPath,
		newDir = path.dirname(newPath);
		
		mkdirp(newDir, 0777, function() {
			
			fromFile(ops, file, function(err, content) {
				
				fs.writeFile(newPath, content, function() {
					
					if(!(--numWriting)) next();
				});
			});
		});
	});
	
	
}