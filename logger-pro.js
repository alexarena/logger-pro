var fs = require('fs')
var date = new Date()
var filename = 'debug.log'

var debug = false
var showTimestamp = false
var stdout = true
var fileout = false

module.exports.config = function(config){
	if(config.hasOwnProperty('debug')){
		debug = config.debug
	}
	if(config.hasOwnProperty('showTimestamp')){
		showTimestamp = config.showTimestamp
	}
	if(config.hasOwnProperty('stdout')){
		stdout = config.stdout
	}
	if(config.hasOwnProperty('fileout')){
		fileout = config.fileout
	}

//	filename = 'debug_' + getDateTime(true) + '.log'

}

module.exports.value = function(variable,name){

}

module.exports.delete = function(){
	fs.stat(filename, function (err, stats) {
		if (!err) {
			fs.unlink(filename,function(err){})
		}
	})
}



var message = function(message){
	message = createMessage(message)
	if(debug){

		if(fileout){fs.appendFile(filename, message, function (err) {})}
		if(stdout){console.log(message)}
	}
}

function createMessage(message){
	var temp = '';
	if(showTimestamp){
		temp = temp + getDateTime(false) + ': '
	}

	if(typeof(message) == 'object'){
		message = JSON.stringify(message,null,4)
	}

	if(typeof(message) == 'string'){
		message = message.replace(/\n/g, '\n          ');
	}
	temp += message + '\n';
	return temp
}

function getDateTime(showDate) {

	var date = new Date()

	var hour = date.getHours()
	hour = (hour < 10 ? "0" : "") + hour

	var min  = date.getMinutes()
	min = (min < 10 ? "0" : "") + min

	var sec  = date.getSeconds()
	sec = (sec < 10 ? "0" : "") + sec

	var year = date.getFullYear()

	var month = date.getMonth() + 1
	month = (month < 10 ? "0" : "") + month

	var day  = date.getDate();
	day = (day < 10 ? "0" : "") + day

	if(showDate){
		return year + ":" + month + ":" + day + " @ " + hour + "." + min + "." + sec
	}
	else{
		return hour + ":" + min + ":" + sec
	}

}

module.exports.message = message
module.exports.msg = message
