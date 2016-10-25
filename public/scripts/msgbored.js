console.log('hi');

$(function() {
  
  console.log('dom ready');
  var boardName = $('#boardName').html();
  if(!boardName) boardName = '1';
  //TODO: 
  //      date format
  //fuck it
  
  //hack for enter key since I can't google it
  $('#boardnameinput').on('keyup', function(e) {
    console.log(e);
    if(e.keyCode === 13) {
      $('#gotoboard').click()
    }
  });
  
  $('#msgbox').on('keyup', function(e) {
    console.log(e);
    if(e.keyCode === 13) {
      $('#msgsend').click()
    }
  });
  
  $('#msgsend').click(function() {
    
    
    var msg = Object();
    msg.text = $('#msgbox').val()
    msg.board = boardName;
    console.log(msg);
    
    $.ajax({
        url: "/api/postMessage",
        type: "post",
        data: msg,
        dataType: "json",
        success: function (data) {
            console.log(data);
            window.location = window.location;
        },
        error: function (jqXHR, textStatus) {
            alert("Hi Kirsty. Stop using emojis " + jqXHR.responseText);
        }
    });
    return false;
  })
  
  $('#gotoboard').click(function() {
    var boardName = $('#boardnameinput').val();
    if(boardName) {
      window.location = '/board/' + boardName;
      return false;
    }
  });
  
});