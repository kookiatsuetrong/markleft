var express = require('express')
var server  = express()
var fs      = require('fs')
server.engine('html', require('ejs').renderFile)
server.listen(1222)
server.use(show)
server.use(express.static('public'))

function show(req, res, next) {
	fs.exists('public' + req.url, function(result) {
		if (req.url.endsWith('.ml') && result) {
			fs.readFile('public' + req.url, 'utf8', function(error, data) {
				res.render('index.html', {content: data})
			})
		} else {
			next()
		}
	})

}
