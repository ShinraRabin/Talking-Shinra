let socket = io()

function scrollToBottom(){
  let messages = document.querySelector('#messages').lastElementChild;
  messages.scrollIntoView();

}

socket.on("connect", () => {
  console.log("connected to server");
});

socket.on("disconnect", () => {
  console.log("disconnected from server");
});

socket.on("newMessage", function (message) {
  const formattedTime = moment(message.createdAt).format("LT");
  const template = document.querySelector("#message-template").innerHTML;
  const html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime,
  });

  const div = document.createElement("div");
  div.innerHTML = html;

  document.querySelector("#messages").appendChild(div);
  scrollToBottom(); 

});

socket.on("newLocationMessage", function (message) {
  const formattedTime = moment(message.createdAt).format("LT");
  const template = document.querySelector("#location-message-template").innerHTML;
  const html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime,
  });

  const div = document.createElement("div");
  div.innerHTML = html;

  document.querySelector("#messages").appendChild(div);

  // console.log("newLocationMessage", message);
  // let li = document.createElement('li');
  // let a = document.createElement('a');
  // li.innerText = `${message.from} ${formattedTime}`
  // a.setAttribute('target', '_blank');
  // a.setAttribute('href', message.url);
  // a.innerText = 'My current Location';
  // li.appendChild(a);

  // document.querySelector('body').appendChild(li);
});

document.querySelector("#submit-btn").addEventListener("click", function (e) {
  e.preventDefault();
  var messageInput = document.querySelector('input[name="message"]');
  var message = messageInput.value;

  socket.emit(
    "createMessage",
    {
      from: "User",
      text: message
    },
    function () {
         messageInput.value = "";
    }
  );
});

document
  .querySelector("#send-location")
  .addEventListener("click", function (e) {
    if (!navigator.geolocation) {
      return alert("Geolocation is not supported by your browser.");
    }

    navigator.geolocation.getCurrentPosition(
      function (position) {
        socket.emit("createLocationMessage", {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      function () {
        alert("Unable to fetch location.");
      }
    );
  });
