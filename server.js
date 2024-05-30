const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const axios = require('axios');
const axiosRetry = require('axios-retry').default;

// load environment variables from .env file
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

// load your OpenAI API key from the environment variables
const openaiApiKey = process.env.OPENAI_API_KEY;
const openaiModel = process.env.OPENAI_MODEL || 'gpt-3.5-turbo'

// configure axios-retry
axiosRetry(axios, {
  retries: 5, // number of retry attempts
  retryDelay: (retryCount) => {
    return axiosRetry.exponentialDelay(retryCount);
  },
  retryCondition: (error) => {
    // retry on rate limit status code (429) or server errors (5xx)
    return error.response && (error.response.status === 429 || error.response.status >= 500);
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chatmessage', async (msg) => {
    console.log('message: ' + msg);
    io.emit('chatmessage', `User: ${msg}`);

    // call OpenAI API to process the message
    try {
      const requestData = {
        model: openaiModel,
        messages: [
          {
            role: "system",
            content: "You are a virtual assistant, skilled in answering user questions with creative reply."
          },
          {
            role: "user",
            content: msg
          }
        ]
      };

      // make the POST request using Axios with retry on failure
      const response = await axios.post('https://api.openai.com/v1/chat/completions', requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`
        }
      });

      const botResponse = response.data.choices[0].message.content;
      io.emit('chatmessage', `Bot: ${botResponse}`);
    } catch (error) {
      console.error('Error invoking OpenAI model:', error);
      io.emit('chatmessage', 'Bot: Sorry, I am unable to process your request at the moment.');
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Simple AI Chatbot listening on PORT: ${PORT}`);
});
