//Referencias de HTML
const lblOnline = document.querySelector('#lblOnline');//Constante la cual tiene identificada en el HTML como ese id = "lblOnline".
const lblOffline = document.querySelector('#lblOffline');//Constante la cual tiene identificada en el HTML como ese id = "lblOffline".
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

const socket = io();//Constante llamada "socket" la cual agarra el ".io".

socket.on('connect', () => {//Cuando esté conectado el usuario, esto es lo que hará.
    // console.log('Conectado', socket.id);

    lblOffline.style.display='none';
    lblOnline.style.display='';
    
});

socket.on('disconnect', () => {//socket.on Agarra el paquete de socket.io, el "on" sirve para decir "escuchar eventos" el cual está especificado como 'disconnect', la cual dispara una función de flecha haciendo todo lo que está abajo cuando la conexión se pierde. 
    // console.log('Desconectado', socket.id);
    lblOnline.style.display='none';
    lblOffline.style.display='';
});

socket.on('enviar-mensaje', ( payload ) =>{
    //Para mostrar en pantalla
    const msg = document.createElement("li");
    const txtMsg = document.createTextNode(socket.id+" "+payload.mensaje);
    msg.appendChild(txtMsg);
    document.getElementById('recibir').appendChild(msg);
    console.log( payload );
})

btnEnviar.addEventListener('click', () =>{
    const mensaje = txtMensaje.value;
    const payload = { //Puede ser cualquier nombre.
        mensaje,
        id: '123',
        fecha: new Date().getTime()
    }
    socket.emit('enviar-mensaje', payload, (id) => {
        console.log("Desde el servidor: ", id);
    });
})
