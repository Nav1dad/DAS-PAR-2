let chatData = JSON.parse(localStorage.getItem('chatMessages')) || [];

// Mostrar mensajes en el chat
function displayMessages() {
    const messageList = document.getElementById('messageList');
    messageList.innerHTML = ''; // Limpiar la lista

    chatData.forEach((message, index) => {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = `${message.sender}: ${message.text}`;
        
        // Crear un botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.className = 'btn btn-danger btn-sm ms-2'; // Estilo para el botón
        deleteButton.onclick = () => deleteMessage(index); // Llamar a la función de eliminar
        
        messageDiv.appendChild(deleteButton);
        messageList.appendChild(messageDiv);
    });
}

// Enviar mensaje
document.getElementById('sendMessageBtn').addEventListener('click', () => {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    if (messageText) {
        const message = {
            sender: 'Maestro Elmer', // Cambiar según el rol del usuario
            text: messageText,
            timestamp: new Date()
        };

        chatData.push(message);
        localStorage.setItem('chatMessages', JSON.stringify(chatData));
        displayMessages();
        messageInput.value = ''; // Limpiar el campo de entrada
    }
});

// Función para eliminar mensajes
function deleteMessage(index) {
    // Confirmar la eliminación
    if (confirm("¿Deseas eliminar este mensaje?")) {
        chatData.splice(index, 1); // Eliminar el mensaje
        localStorage.setItem('chatMessages', JSON.stringify(chatData)); // Actualizar localStorage
        displayMessages(); // Volver a mostrar los mensajes
    }
}

// Función para vaciar todo el chat
function clearChat() {
    if (confirm("¿Deseas vaciar todo el chat?")) {
        chatData = []; // Limpiar el array de mensajes
        localStorage.removeItem('chatMessages'); // Limpiar localStorage
        displayMessages(); // Volver a mostrar los mensajes (vacío)
    }
}

// Evento para el botón de vaciar chat
document.getElementById('clearChatBtn').addEventListener('click', clearChat);

// Mostrar mensajes al cargar la página
displayMessages();
