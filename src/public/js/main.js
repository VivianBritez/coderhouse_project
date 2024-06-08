const socket = io();

// Escucha mensajes del servidor
socket.on("message", (message) => {
  console.log("Mensaje del servidor:", message);
  const messagesDiv = document.getElementById("messages");
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  messagesDiv.appendChild(messageElement);
});

// Enviar mensaje al servidor
document.getElementById("sendMessage").addEventListener("click", () => {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value;
  socket.emit("chatMessage", message);
  messageInput.value = "";
});
