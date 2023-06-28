let socket = io();


socket.on('connect', () =>{
    console.log("connected to server");

    socket.emit('createMessage', {
        from:"Shinra",
        text:"ola baby!"
    })
});

socket.on('disconnect', () =>{
    console.log("disconnected from server");
});