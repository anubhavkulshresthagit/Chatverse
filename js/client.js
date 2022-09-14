const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".chat-section");



const append = (message, position) => {
    const text = document.createElement('div');
    text.innerText = message;
    text.classList.add('message');
    text.classList.add(position);
    messageContainer.append(text);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})

const name = prompt("Enter your name to join"); 
// console.log(name, "hello");
socket.emit('new-user-joined', name);

socket.on('user-joined', name=>{
    append(`${name} joined the chat`, 'right') 
});

socket.on('recieve', data=>{
    append(`${data.name} : ${data.message}`, 'left') 
})