// ------ 1 - Instalar express ---
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

app.use(cors());
const socketIo = require('socket.io'); // ---- 2 - Inporte os modulos -----
// 3 --- Crie conexão SOCKETIO -----

// ---- 4 - Crie a pasta public e arquivo "index.html" cacete lembre-se disso é "index.html"!!! -----
app.get('/' ,(req, res) =>  { res.redirect('./sala1'); });
app.use('/sala1', express.static( path.join(__dirname, 'public' )));
app.use('/sala2', express.static( path.join(__dirname, 'public' )));



const server = app.listen(process.env.PORT, () => {

    console.log("SERVIDOR LIGADO NA PORTA ",process.env.PORT );
    console.log("COPACHAT - O Melhor site corpotativo da região !");
});


const io = socketIo(server);

// -----PREPARANDO Quando tiver uma nova mensagem ela será colocado no Array e sera enviada para todos ---
const messages = { sala1:[], sala2:[] };// 5 - Criar Array de Mensagens 

const sala1 = io.of('/sala1').on('connection' , (socket) => {

    console.log('Uma nova Conexão!');
    socket.emit('update_messages', messages.sala1); // Direcionamento de Salas

    socket.on('new_message', function(data){

        messages.sala1.push(data); 
        console.log(messages);
        sala1.emit('update_messages', messages.sala1); // Direcionamento de Salas
    });

});


const sala2 = io.of('/sala2').on('connection' , (socket) => {

    console.log('Uma nova Conexão!');
    socket.emit('update_messages', messages.sala2);

    socket.on('new_message', function(data){

        messages.sala2.push(data);
        console.log(messages);
        sala2.emit('update_messages', messages.sala2);
    });

});