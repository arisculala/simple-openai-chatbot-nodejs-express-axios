# simple-openai-chatbot-nodejs-express-axios

- This simple AI Chatbot application sets up a basic Node.js server with express and socket.io, and integrates with the OpenAI API using axios to handle chat messages, including retry logic to manage rate limits. Call axios retry on rate limit status code (429) or server errors (5xx)

## Table of Contents

- [Getting Started](https://github.com/arisculala/simple-openai-chatbot-nodejs-express-axios#getting-started)
  - [Prerequisites](https://github.com/arisculala/simple-openai-chatbot-nodejs-express-axios#prerequisites)
  - [Installation](https://github.com/arisculala/simple-openai-chatbot-nodejs-express-axios#installation)

[References](https://github.com/arisculala/simple-openai-chatbot-nodejs-express-axios#references)

## Getting Started
The application is using free tier OpenAPI api key account. If you reached your rate limit and want to test the application, you may need to consider subscribing to OpenAI models pricing (https://platform.openai.com/docs/models). By default the application is using `GPT-3.5 Turbo`

### Prerequisites
Before you begin, ensure you have the following installed:

- Node.js
- npm
- OpenAI Api Key (https://platform.openai.com/docs/quickstart/account-setup)

### Installation

1. Clone the repository

```bash
$ git clone https://github.com/arisculala/simple-openai-chatbot-nodejs-express-axios.git
```

2. Copy .env.example (Configure the service by updating the .env file with your specific details)

```bash
$ cd simple-openai-chatbot-nodejs-express-axios
$ cp .env.example .env
```

3. Install dependencies

```bash
$ npm install
```

4. Run the service

```bash
$ npm run dev
```

5. Open service in the browser

```bash
http://localhost:3000/
```

## References
- https://platform.openai.com/docs/overview
- https://www.npmjs.com/package/axios-retry
- https://www.npmjs.com/package/axios
