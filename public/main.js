const socket = io()
const clientsTotal = document.getElementById('clients-total');
const messageContainer = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messageFeedback = document.getElementById('feedback')

socket.on('clients-total', (data) => {
    clientsTotal.innerText = `total clients are ${data}`

})

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    sendMessage();
})
function sendMessage() {
    console.log(messageInput.value)
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date()
    }
    socket.emit('message', data);
    addMessageToUi(true,data)
    messageInput.value=''
}

socket.on('chat-message', (data) => {
    
    addMessageToUi(false,data)
})

function addMessageToUi(isOwnMessage, data) {
    const element = ` <li class="${isOwnMessage ? 'message-right' : 'message-left'}">
                <p class="message">${data.message}</p>
                <span>${data.name} ${moment(data.dateTime).fromNow()}</span>
            </li>`
            messageContainer.innerHTML+=element;
            scroll();
            const element2 = `${data.name} is typing a message`
}

function scroll(){
    messageContainer.scrollTo(0,messageContainer.scrollHeight);
}