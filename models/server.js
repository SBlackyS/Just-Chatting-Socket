const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controllers');


class Server {

    constructor() {
        this.app  = express();//Guardando el servidor express en la propiedad app
        this.port = process.env.PORT;//Puerto al que se va a conectar y guardandolo como una propiedad.
        this.server = require( 'http' ).createServer( this.app );//Conectando el servidor express por medio de .server, el cuál es parte del paquete instalado anteriormente como socket.io
        this.io = require( 'socket.io' )( this.server );//Requiriendo el paquete socket.io, el cual se conectara junto a la propiedad de "server" y en conjunto harán un "web socket"

        this.paths = { };

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        this.sockets();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {

    }
    
    sockets(){
        this.io.on('connection', socketController);
    }

   listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;