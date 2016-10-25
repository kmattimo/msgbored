var keystone = require('keystone'),
		Types = keystone.Field.Types,
		General;

General = new keystone.List('General', {
	label: 'General Content Pages',
	defaultColumns: ['title', 'includeInMainMenu'],
	map: {
		name: 'title'
	},
	autokey: {
		path: 'slug',
		from: 'title',
		unique: true
	},
	track: true
});

General.add({
	title: {
		type: String,
		required: true,
		initial: true
	},
	contents: {
		label: 'Full Description',
		note: 'This is the body content displayed on the General Content Page.',
		type: Types.Html,
		wysiwyg: true,
		height: 400
	}
},'Display Flags', {
	includeInMainMenu: {
		label: 'Include Page within Main Navigation',
		note: 'This determines whether this General Content Page will appear within the Main Navigation.',
		type: Boolean
	}
});

General.register();
