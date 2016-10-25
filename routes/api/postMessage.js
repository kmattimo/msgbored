var keystone = require('keystone'),
  Message = keystone.list('Message');

exports = module.exports = function(req, res) {
  console.log(req.body);
  var newMessage = new Message.model({
      text: req.body.text,
      board: req.body.board.toLowerCase()
  });

  newMessage.save(function(err) {
      if (err){
        console.log(err);
        //console.dir(req.body);
        res.statusCode = 500;
        return res.json({success:false,message:'Error storing the comment.'})
      }
      return res.json({success:true});
  });
};
