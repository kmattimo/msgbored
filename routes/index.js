var _ = require('underscore'),
	keystone = require('keystone'),
	middleware = require('./middleware'),
	importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api')
};

// Setup Route Bindings
exports = module.exports = function(app) {

	// Views
	app.get('/', routes.views.index);
	app.get('/board/:name', routes.views.index);
	// app.get('/api/createBoard/:name', routes.api.createBoard);
	// app.get('/createBoard/:name', routes.api.createBoard);
	
	app.post('/api/postMessage', routes.api.postMessage);

};
