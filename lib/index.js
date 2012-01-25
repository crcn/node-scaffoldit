var celeri = require('celeri'),
Step = require('step'),
fs = require('fs');


function getInputStep(property, propOpsOrMsg, params) {
	
	return function(err) {
		
		var propOps = {},
		next = this;
		

		if(typeof propOpsOrMsg == 'string') {

			propOps.msg = propOpsOrMsg;
		}
		else {	
			//probably has default value defined
			propOps = propOpsOrMsg;
		}
		var message = propOps.msg || propOps.message;

		if(!propOps.type) {

			var search = /^\s*\((.*?)\)/;
			var inputType = message.match(search);
			propOps.type = inputType ? inputType[1] : 'prompt';
			message = message.replace(search,'').replace(/^\s*/g,'');
		}
		
		

		
		function onDefaultValue(defaultValue) {

			celeri.open();

			celeri[propOps.type](message + (defaultValue ? ' (' + defaultValue + ') ' : ' '), function(value) {
				
				params[property] = value || defaultValue || value;
				
				next(false, params);
			});
		}
		
		if(params[property]) {
			
			next(false, params)
		}
		else
		if(propOps.value) {
			
			if(typeof propOps.value == 'function') {

				//can return value (sync), or async
				var ret = propOps.value(params, function(defaultValue) {

					onDefaultValue(defaultValue);
				});

				if(ret) onDefaultValue(ret);
			}
			else
			{
				onDefaultValue(propOps.value);
			}
		} 

		//no default value
		else {
			
			onDefaultValue();
		}
	}
} 



module.exports = function(ops) {

	
	Step(function() {
	
		var params = ops.params || {},
		next = this,
		steps = [];
		
		for(var property in ops.input) {
			
			var  propOpsOrMsg = ops.input[property];
			
			steps.push(getInputStep(property, propOpsOrMsg, params));
		}
		
		steps.push(next);
		
		
		Step.apply(null, steps);
	},
	function(err, params) {
		
		ops.build(params, this);
	}, 
	ops.complete || function()
	{
		
	});
}


fs.readdirSync(__dirname + '/plugins').forEach(function(plugin)
{
	if(plugin.substr(0,1) == '.') return;
	
	module.exports[plugin.replace('.js','')] = require(__dirname + '/plugins/' + plugin);
})


