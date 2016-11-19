var log = require('./logger-pro')

log.config({debug:true,showTimestamp:false,stdout:false,fileout:true})

var x = 12
log.msg('hello world')
log.delete()
