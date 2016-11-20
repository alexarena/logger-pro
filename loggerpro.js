//Dependencies
var fs = require('fs')
var colors = require('colors')

//Defaults
var filename = 'debug.log'
var showTimestamp = false
var stdout = true
var fileout = false
var debug = false
if(process.env.ENABLE_LOGGING){
	debug = process.env.ENABLE_LOGGING
}

module.exports.enable = function(){
	debug = true
}

module.exports.disable = function(){
	debug = false
}

module.exports.toggle = function(){
	if(debug == true){debug = false}
	else{debug = true}
}

module.exports.config = function(config){
	if(config.hasOwnProperty('log')){
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
}

module.exports.val = function(variable,name){
	var toSTD = ""
	var toFile = ""
	toSTD += timeStamp(true)
	toFile += timeStamp()

	var contents =  typeof(variable) + ' ' + name + ' = ' + variable
	toSTD += contents
	toFile += contents

	log({"std":toSTD,"file":toFile})
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
	log(message)
}

module.exports.message = message
module.exports.msg = message

function createMessage(message){
	var toSTD = ''
	var toFile = ''
	toSTD += timeStamp(true)
	toFile += timeStamp()
	if(typeof(message) == 'object'){
		message = JSON.stringify(message,null,4)
	}

	if(typeof(message) == 'string'){
		message = message.replace(/\n/g, '\n          ');
	}
	toSTD += message
	toFile += message
	return {"std":toSTD,"file":toFile}
}

function timeStamp(color){
	if(showTimestamp){
		var temp = "[" + getDateTime(false) + "] "
		if(color == true){
			temp = temp.bold.blue
		}
		return temp
	}
	return ""
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

function log(message){
	if(debug){
		if(fileout){fs.appendFile(filename, message.file+'\n', function (err) {})}
		if(stdout){console.log(message.std)}
	}
}
