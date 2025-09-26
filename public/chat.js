var socket = io.connect('http://localhost:4000');

var persona = document.getElementById('persona'),
    appChat = document.getElementById('app-chat'),
    panelBienvenida = document.getElementById('panel-bienvenida'),
    usuario = document.getElementById('usuario'),
    mensaje = document.getElementById('mensaje'),
    botonEnviar = document.getElementById('enviar'),
    escribiendoMensaje = document.getElementById('escribiendo-mensaje'),
    output = document.getElementById('output');

botonEnviar.addEventListener('click', function(){
    if(mensaje.value){
        socket.emit('chat', {
            usuario: usuario.value,
            mensaje: mensaje.value
        });
        mensaje.value = "";
    }
});

mensaje.addEventListener('keypress', function(){
    socket.emit('escribiendo', usuario.value);
});

socket.on('chat', function(data){
    output.innerHTML += `<p><strong>${data.usuario}:</strong> ${data.mensaje}</p>`;
    escribiendoMensaje.innerHTML = "";
});

socket.on('escribiendo', function(data){
    escribiendoMensaje.innerHTML = `<p><em>${data} está escribiendo...</em></p>`;
});
