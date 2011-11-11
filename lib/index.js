var celeri = require('celeri'),
Step = require('step');


function getInput(propOpsOrMsg, callback)
{
	var propOps = {};
	
	if(typeof propOpsOrMsg == 'string')
	{
		propOps.msg = propOpsOrMsg;
	}
	else
	{
		
		//probably has default value defined
		propOps = propOpsOrMsg;
	}
	
	var message = propOps.msg || propOps.message;
	
	var inputType = message.match(/^\s*\((.*?)\)/);
	
	if(inputType) inputType = inputType[1];
	
	
} 



module.exports = function(ops)
{
	Step(function()
	{
		for(var property in ops.input)
		{
			var  propOpsOrMsg = ops.input[property];
			
			getInput(propOpsOrMsg);
		}
	},
	function(err)
	{
		console.log(err.stack)
	});
}


