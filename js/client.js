const socket = io('http://localhost:8000');
//const moment = require('moment');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('vande_mataram.mp3');
//const users = document.getElementbyId('use');
//const username = Qs.parse(location.search, {ignoreQueryPrefix: true});

/*function outputUsers(use) {
  users.innerHTML = '';
  use.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    users.appendChild(li);
  })
}*/
const append = (message, position)=>{
	//time = moment().format('h:mm a');
	const messageElement = document.createElement('div');
	messageElement.innerText = message;
	//messageElement.classList.add(time);
	messageElement.classList.add('message');
	messageElement.classList.add(position);
	messageContainer.append(messageElement);
	if(position =='left')
	{
	 audio.play();
    }
}

form.addEventListener('submit', (e)=>{
	e.preventDefault();
	const message = messageInput.value;
	append(`You: ${message}`, 'right');
	socket.emit('send', message);
	messageInput.value = ''
})
const name = document.getElementById("username");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
	append(`${name} joined the chat`, 'right');
	outputUsers(use);
})

socket.on('receive', data =>{
	append(`${data.name} : ${data.message}`, 'left');
})

socket.on('left', name =>{
	append(`${name} left the chat`, 'right');
})	