var log = require('./logger-pro')

//log.config({debug:true,showTimestamp:true,stdout:true,fileout:true})

//log.config({debug:false,showTimestamp:true})
//log.enable()

var x = 12
log.msg('hello world')
//log.delete()
log.val(x,'x')

var obj = {"make":"Bentley","model":"Continental GT","color":"Blue"}
var arr = [obj,obj,obj,obj,obj]

console.log(arr)
log.msg(arr)

console.log(obj)
log.msg(obj)

log.msg('The next message shouldn\'t be displayed.')
log.config({debug:false})
log.message('Hello?')
