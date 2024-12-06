
# Simple Chat Module 🚀

A lightweight real-time chat server built with **Socket.IO** and **Express**. This module enables seamless communication between users in your project and can be easily integrated into any Node.js application.

## Features 🌟

- **Real-time messaging**: Instantly exchange messages between connected users.
- **Automatic user management**: Tracks when users join and leave the chat.
- **Customizable user IDs**: Each user gets a unique ID based on their connection.
- **Easy integration**: Just plug in the provided HTML and server-side code into your project.

## Installation 🛠️

To get started with the chat server, follow the steps below:

### Step 1: Clone the repository 📥

Clone the repository to your local machine:

```bash
git clone https://github.com/Card1nal-lzt/simple-chat-module.git
cd simple-chat-module
```

### Step 2: Install dependencies 🔧

Make sure you have **Node.js** and **npm** installed. Then, install the required dependencies:

```bash
npm install
```

### Step 3: Start the server 🚀

Once dependencies are installed, you can start the chat server:

```bash
npm start
```

The server will now be running on [http://localhost:3000](http://localhost:3000).

### Step 4: Frontend integration 💻

You can integrate the provided `index.html` file into your project. It contains the front-end code that connects to the server via Socket.IO and displays messages.

Include the following snippet in your HTML to use the chat:

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io();
  socket.on('message', (data) => {
    // Display received messages
    console.log(data);
  });
  
  // Example of sending a message
  socket.emit('message', 'Hello from client!');
</script>
```

## Usage 💬

Once the server is running, users can connect and start chatting. Messages are broadcasted to all connected clients, and each user's unique ID (based on their socket ID) will be shown with their message.

### Available Events 🔄

- **Client to Server**: Emit `message` to send a message to the server.

  ```javascript
  socket.emit('message', 'Hello, world!');
  ```

- **Server to Client**: The server sends messages to all connected clients.

  ```javascript
  io.emit('message', 'User_123: Hello, world!');
  ```

## Example 💡

### `index.html` (Frontend Example)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple Chat</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: #f4f4f4; }
    #chat-container { width: 400px; height: 400px; border: 1px solid #ccc; background: #fff; overflow-y: auto; padding: 10px; margin-bottom: 10px; }
    #chat-container div { margin-bottom: 5px; }
    form { display: flex; width: 400px; }
    input[type="text"] { flex: 1; padding: 10px; border: 1px solid #ccc; }
    button { padding: 10px; background-color: #007bff; color: white; border: none; cursor: pointer; }
    button:hover { background-color: #0056b3; }
  </style>
</head>
<body>
  <div id="chat-container"></div>
  <form id="chat-form">
    <input type="text" id="message" placeholder="Type your message..." required />
    <button type="submit">Send</button>
  </form>
  <script src="/socket.io/socket.io.js"></script>
  <script>
    const socket = io();
    const chatContainer = document.getElementById('chat-container');
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message');
    function addMessage(message) {
      const messageElement = document.createElement('div');
      messageElement.textContent = message;
      chatContainer.appendChild(messageElement);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    socket.on('message', (data) => {
      addMessage(data);
    });
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const message = messageInput.value;
      if (message.trim() !== '') {
        socket.emit('message', message);
        addMessage(`You: ${message}`);
        messageInput.value = '';
      }
    });
  </script>
</body>
</html>
```

## License 📜

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
