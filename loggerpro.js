//Dependencies
var fs = require('fs')
var colors = require('colors')

//Defaults
var filename = 'debug.log'
var showTimestamp = false
var stdout = true
var fileout = false
var debug = false
var useEmoji = true
if(process.env.ENABLE_LOGGING){
	debug = process.env.ENABLE_LOGGING
}

var indicators = {"success":"✅  ","info":"ℹ️  ","error":"❗️  ","warn":"⚠️  "}

module.exports.config = function(config){

	if(config.hasOwnProperty('useEmoji')){
		useEmoji = config.useEmoji
		if(useEmoji == false){
			indicators = {"success":"SUCCESS  ","info":"","error":"ERR  ","warn":"WARNING  "}
		}
	}

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

module.exports.val = function(variable,name){
	var toSTD = ""
	var toFile = ""
	toSTD += indicators.info + timeStamp('blue')
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

var message = function(message,status){
	message = createMessage(message,status)
	log(message)
}

module.exports.message = message
module.exports.msg = message

function createMessage(message,status){
	var toSTD = ''
	var toFile = ''

	if(status){
		if(status.includes("success")){
			toSTD += indicators.success
			toFile += indicators.success
			toSTD += timeStamp('green')
		}
		else if(status.includes("err")){
			toSTD += indicators.error
			toSTD += timeStamp('red')
			toFile += indicators.error
		}
		else if(status.includes("warn")){
			toSTD += indicators.warn
			toSTD += timeStamp('yellow')
			toFile += indicators.warn
		}
	}
	else{
		toSTD += indicators.info
		toSTD += timeStamp('blue')
		toFile += indicators.info
	}

	toFile += timeStamp()
	if(typeof(message) == 'object'){
		message = JSON.stringify(message,null,4)
	}

	if(typeof(message) == 'string'){
		message = message.replace(/\n/g, '\n              ');
	}
	toSTD += message
	toFile += message
	return {"std":toSTD,"file":toFile}
}

function timeStamp(color){
	if(showTimestamp){
		var temp = "[" + getDateTime(false) + "] "
		if(typeof(color) == 'string'){
			if(color.includes('red')){
				temp = temp.red.bold
			}
			if(color.includes('yellow')){
				temp = temp.yellow.bold
			}
			if(color.includes('green')){
				temp = temp.green.bold
			}
			else{
				temp = temp.blue.bold
			}
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
