const room = window.location.pathname.replace(/\//g,''); // g todas as ocorrencias 
const socket = io(`http://192.168.0.107:3000/${room}`);

let user = '';
// Quando acontecer isso | vou exercultar um funcao que irá receber os meus dados
socket.on('update_messages', (messages) => {

    updateMessagesOnScreen(messages)
});

function updateMessagesOnScreen(messages) {
    const div_messages = document.querySelector('#messages'); 

    // let list_messages = '<ul>'
    // messages.forEach(message => {
    //     list_messages += `<li><b>${ message.user }</b>: ${ message.msg }</li>`
    // });

    // list_messages += '</ul>'

    let list_messages = '<ul>'
    messages.forEach(message => {
        if (message.user == user) {
            
            list_messages += `
            <div align="right" class="mensagensDoUsuario-local">
                <li><b>${ message.user }</b>: ${ message.msg }</li>
            </div>`;
        } else {
            list_messages += `
            <div>
                <li><b>${ message.user }</b>: ${ message.msg }</li>
            </div>`;
        }
    });

    list_messages += '</ul>'

    div_messages.innerHTML = list_messages;
};

document.addEventListener('DOMContentLoaded', () => {

    // Criando Envio de mensagem para tela

    const form = document.querySelector('#message_form');// Pega o formulario

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Remove e feito do formulario

        if (!user) {
            alert('O Usuario não foi definido! Defina um AGORA! BABACA!')
            return;
        }

        const message = document.forms['message_form_name']['msg'].value; // Pega a msg dentro do formulario
        document.forms['message_form_name']['msg'].value = ''; // Esvazia o campo input msg
        socket.emit('new_message', { user:user , msg: message }) //  Envia a mesagem para back end
        console.log(message); // Mostra ela no Back-end
    });
    // Criando USUARIO da mensagem 
    // Faz a mesma coisa de Cima porem sem 
    const userform = document.querySelector('#user_form');
    const userDefinition = document.querySelector('#idenficacaoUsuario');
    

    userform.addEventListener('submit', (e) => { 
        e.preventDefault();
        
        user = document.forms['user_form_name']['user'].value ;
        userform.parentNode.removeChild(userform); // REMOVE USERFORM DA TELA
        userDefinition.innerHTML = `<h3 class="nomeUsuario">Olá! ${user}</h3>`;
    });
});