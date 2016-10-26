// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone'),
	handlebars = require('express3-handlebars')

keystone.init({

	'name': 'msgbored',
	'brand': 'msgbored',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'hbs',
	'port': process.env.PORT || 8888,
	'wysiwyg additional options': {
		relative_urls: false,
	 	convert_urls: false
	},
	'wysiwyg override toolbar': true,
	'wysiwyg additional plugins': 'image, template',
	'wysiwyg additional options': {
		templates:[
			{
				title: 'Comment Block Token',
				description: 'Inserts the Comments/Questions Control (General Content Pages Only).',
				content: "{{{COMMENTBLOCK}}}"
			}]
		},
	'wysiwyg skin': 'lightgray',
	'wysiwyg additional buttons':'bold italic underline strikethrough subscript superscript,alignleft aligncenter alignright,outdent indent,formatselect,bullist numlist,removeformat link image template,code',
	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		// helpers: new require('./templates/views/helpers')(),
		extname: '.hbs'
	}).engine,

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': 'asdfasdfas=8$asdfasdfasdfasdfTI]H4a.PB3[',
	'mongo': process.env.MONGO_URL || process.env.MONGO_URI || 'mongodb://localhost/msgbored'
});

keystone.import('models');

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
	pageTitle: 'msgbored'
});

keystone.set('routes', require('./routes'));



keystone.start();
