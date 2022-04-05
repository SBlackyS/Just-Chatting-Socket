const socketController = (socket) =>{
    console.log( 'Cliente conectado',socket.id );

    socket.on('disconnect', () =>{
        console.log( 'Cliente Desconectado', socket.id );
    })

    socket.on('enviar-mensaje', (payload, callback) => {//Está recibiendo el evento 'enviar-mensaje' junto con su parámetro payload (Puede ser cualquier nombre)
        const id = 123;
        callback(id);
        socket.broadcast.emit('enviar-mensaje', payload );
    })
    
}

module.exports = {
    socketController
}