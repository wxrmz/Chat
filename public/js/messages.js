const userId = localStorage.getItem('userId');
const username = localStorage.getItem('username');

if (!userId || !username) window.location.href = '/';

document.getElementById('username').textContent = username;

const socket = io();
socket.emit('get_history');

const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const messagesContainer = document.getElementById('messagesContainer');

const appendMessage = message => {
    const el = document.createElement('div');
    el.className = 'message';
    el.textContent = `${message.User?.username || message.username}: ${message.content}`;
    messagesContainer.appendChild(el);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
};

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const content = messageInput.value.trim();
    if (!content) return;

    socket.emit('send_message', { content, userId: parseInt(userId) });
    messageInput.value = '';
});

socket.on('message_history', messages => {
    messagesContainer.innerHTML = '';
    messages.forEach(appendMessage);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

socket.on('new_message', appendMessage);

socket.on('error', ({ message }) => {
    console.error('Socket error:', message);
    alert(message);
});

const signOutBtn = document.getElementById('signOutBtn');
signOutBtn.addEventListener('click', () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    socket.disconnect();
    window.location.href = '/';
});
