var keystone = require('keystone');

var Message = new keystone.List('Message', {
	defaultSort: 'createdAt',
	defaultColumns: 'message, createdAt',
	nocreate: true
});

Message.add({
	text: { type: String, required: true },
	board: {type: String, required: true},
	createdAt: { type: Date, default: Date.now }
});

// Comment.schema.pre('save', function(next) {
// 	this.wasNew = this.isNew;
// 	next();
// })
// 
// Comment.schema.post('save', function() {
// 	if (this.wasNew) {
// 		this.sendNotificationEmailViaSendGrid();
// 	}
// });




// Comment.schema.methods.sendToUsers = function(onFoundValidUsers, callback){
// 	keystone.list('User')
// 		.model
// 		.find({receivesCommentEmails:true, email:{$ne:'admin@onenorth.com'}})
// 		.exec(function(err, users) {
// 			if (err)
// 				return callback(err);
// 			if (users.length === 0)
// 				return console.log('Cannot send email, no valid users exist.');
// 			return onFoundValidUsers(users, callback);
// 	});
// };

Message.register();
