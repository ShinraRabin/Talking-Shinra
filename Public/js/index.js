let socket = io();

socket.on("connect", () => {
  console.log("connected to server");

  // socket.emit('createMessage', {
  //     from:"Shinra",
  //     text:"ola baby!"
  // })
});

socket.on("disconnect", () => {
  console.log("disconnected from server");
});

socket.on("newMessage", function (message) {
  console.log("newMessage", message);
  let li = document.createElement('li');
  li.innerText = `${message.from}: ${message.text}`


document.querySelector('body').appendChild(li);
});

// socket.emit(
//   "createMessage",
//   {
//     from: "Shinra",
//     text: "hey", 
//   },
//   function (message) {
//     console.log("Got it!", message);
//   }
// );

document.querySelector("#submit-btn").addEventListener("click", function (e) {
  e.preventDefault();
 
  socket.emit(
    "createMessage",
    {
      from: "User",
      text: 
      document.querySelector('input[name="message"]').value
    },
    function () {

    }
  );
});

document.querySelector('#send-location').addEventListener('click', function(e) {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }, function() {

    alert('Unable to fetch location.');
  });
});

