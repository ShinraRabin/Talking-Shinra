let socket = io();


socket.on('connect', () =>{
    console.log("connected to server");
});

socket.on('disconnect', () =>{
    console.log("disconnected from server");
});