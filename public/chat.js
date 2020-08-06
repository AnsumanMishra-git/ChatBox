var socket =io.connect("http://localhost:3000/"); //frontend socket

var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output');
      feedback= document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function(){ //on clicking send
  socket.emit('chat', {
          //js objects
      message: message.value,
      handle: handle.value
  });
  message.value = ""; //makes the msg box empty
});

message.addEventListener('keydown',()=>{
  socket.emit('typing',handle.value);
});
// Listen for events
socket.on('chat',(data)=>{
    feedback.innerHTML="";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing',data=>{
  feedback.innerHTML = '<p><em>'+data+' is typing..</em></p>' ;
})
