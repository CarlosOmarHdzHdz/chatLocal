var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(4000, function(){
    console.log('Servidor corriendo en http://localhost:4000');
});

app.use(express.static('public'));

var io = socket(server);

io.on('connection', function(socket){
    console.log('Un usuario se ha conectado');

    socket.on('chat', function(data){
        io.emit('chat', data);
    });

    socket.on('escribiendo', function(data){
        socket.broadcast.emit('escribiendo', data);
    });

    socket.on('disconnect', function(){
        console.log('Un usuario se ha desconectado');
    });
});
