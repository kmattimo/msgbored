var keystone = require('keystone');

	
exports = module.exports = function(req, res) {
//default
var boardName = '1';

var locals = res.locals,
view = new keystone.View(req, res);
	

	if(req.params.name) {
		boardName = req.params.name.toLowerCase().trim();
		console.log('board ' + boardName);
	}

	var getComments = function(next) {
		query = keystone.list('Message')
		.model
		.find({'board': boardName})
		.sort('-createdAt')
		.exec(function (err, results) {
			if(err) console.log(err);
			console.log('yay got results');
			
			for(var i=0; i<results.length; i++) {
				// results[i].dateString =  results[i].createdAt.getHours() + ":" + results[i].createdAt.getMinutes() + ':' + results[i].createdAt.getSeconds() + ', ' + results[i].createdAt.toDateString();
				results[i].dateString =  results[i].createdAt.toLocaleTimeString() + ', ' + results[i].createdAt.toDateString();
			}
			locals.comments = results;
			locals.boardName = boardName;
			var x = new Date();
			locals.timeZone = x.toTimeString();
			next();
			
		});
	};
			
	getComments( function(){view.render('index'); });
	// getComments(function(){ });

};
