var express = require('express');
var socket = require('socket.io');

// Configuración de Express
var app = express();
var server = app.listen(4000, function(){
    console.log('Servidor de chat corriendo en el puerto 4000');
});

// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Configuración de Socket.IO
var io = socket(server);

io.on('connection', function(socket){
    console.log('Un usuario se ha conectado');

    // Manejar evento 'chat'
    socket.on('chat', function(data){
        // Envía el mensaje a todos los clientes conectados
        io.emit('chat', data);
    });

    // Manejar evento 'escribiendo'
    socket.on('escribiendo', function(data){
        // Envía el aviso a todos, EXCEPTO al socket que lo envió
        socket.broadcast.emit('escribiendo', data);
    });

    socket.on('disconnect', function(){
        console.log('Un usuario se ha desconectado');
    });
});