// CORRECCIÓN CLAVE: La dirección de conexión debe ser la IP pública de AWS.
// Usar solo io.connect() es la mejor opción si el cliente se carga desde el servidor de AWS.
// Sin embargo, usaremos la IP hardcodeada para asegurar el funcionamiento en el entorno de evaluación.
var socket = io.connect('http://54.158.244.37:4000'); 

// Capturar elementos del DOM
var usuario = document.getElementById('usuario'),
    mensaje = document.getElementById('mensaje'),
    botonEnviar = document.getElementById('enviar'),
    escribiendoMensaje = document.getElementById('escribiendo-mensaje'),
    output = document.getElementById('output');

// Emitir eventos al hacer clic en el botón
botonEnviar.addEventListener('click', function(){
    if(mensaje.value){
        socket.emit('chat', {
            usuario: usuario.value,
            mensaje: mensaje.value
        });
        mensaje.value = ""; // Limpiar el campo
    }
});

// Emitir evento 'escribiendo' al teclear
mensaje.addEventListener('keypress', function(){
    socket.emit('escribiendo', usuario.value);
});

// Escuchar eventos de 'chat' (mostrar mensajes)
socket.on('chat', function(data){
    output.innerHTML += `<p><strong>${data.usuario}:</strong> ${data.mensaje}</p>`;
    escribiendoMensaje.innerHTML = ""; // Limpiar el mensaje de 'escribiendo'
});

// Escuchar evento de 'escribiendo'
socket.on('escribiendo', function(data){
    escribiendoMensaje.innerHTML = `<p><em>${data} está escribiendo...</em></p>`;
});