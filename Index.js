const { WAConnection, MessageType } = require('@adiwajshing/baileys');

// Create a new instance of WAConnection
const conn = new WAConnection();

// Connect to the WhatsApp server
conn.connect();

// Event listener for when the connection is successfully established
conn.on('open', () => {
  console.log('Connected to WhatsApp');

  // Event listener for incoming messages
  conn.on('chat-update', (chatUpdate) => {
    if (chatUpdate.messages && chatUpdate.count) {
      const message = chatUpdate.messages.all()[0];

      // Check if the message is a text message
      if (message.message && message.message.conversation) {
        const chatId = message.key.remoteJID;
        const text = message.message.conversation;

        // Reply to the message
        conn.sendMessage(chatId, `You said: ${text}`, MessageType.text);
      }
    }
  });
});
