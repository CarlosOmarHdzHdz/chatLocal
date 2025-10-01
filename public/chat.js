// CORRECCIÓN CLAVE: Conexión a la IP pública de AWS.
// Usamos la IP 54.158.244.37 que identificamos para tu servidor.
var socket = io.connect('http://54.158.244.37:4000'); 

// --- Configuración del Sonido ---
// Asegúrate de que este archivo exista en tu carpeta 'public'
var audio = new Audio('notification.mp3'); 

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
    // Reproducir sonido SÓLO si el mensaje no es el mío
    if (data.usuario !== usuario.value) {
        audio.play();
    }

    output.innerHTML += `<p><strong>${data.usuario}:</strong> ${data.mensaje}</p>`;
    escribiendoMensaje.innerHTML = ""; // Limpiar el mensaje de 'escribiendo'
});

// Escuchar evento de 'escribiendo'
socket.on('escribiendo', function(data){
    escribiendoMensaje.innerHTML = `<p><em>${data} está escribiendo...</em></p>`;
});