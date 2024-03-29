# Simple Chatbot Implementation Using Webservice Technology with Golang and Next.js
This project demonstrates a basic chatbot implementation using Golang for the server-side and Next.js for the client-side.

See a demo of chat in Heroku App https://hidden-basin-74114-eb35182db13e.herokuapp.com/

## Project Description
This chatbot provides simple responses based on predefined pop culture references. It showcases the use of webservice technology for communication between the client and server.

### Getting Started

#### Prerequisites:
- Golang (version 1.22 or later)
- Node.js
- pnpm (recommended)

#### Installation:
1. Clone the repository:

```sh 
git clone https://github.com/ohannadeziderio/chatbot-webservice.git
```

2. Navigate to the project directory:

```sh 
cd chatbot-webservice
```

3. Install server dependencies:

```sh
cd server-go/cmd/server && go run main.go
```

4. Install client dependencies:

```sh 
cd client-nextjs && pnpm install && pnpm dev
```

5. The chatbot will be accessible at http://localhost:3000 in your browser.

### Usage
Interact with the chatbot by typing your messages in the chat interface. The chatbot will respond based on its predefined references.

#### Technologies Used
- Golang: for server-side development and webservice implementation.
- Next.js: for building the client-side interface using React.

### Contributing
Contributions are welcome! Please see the CONTRIBUTING.md file for guidelines.

### License
This project is licensed under the MIT License - see the LICENSE.md file for details.

### Known Issues
- The chatbot currently has a limited set of responses.
- Error handling and user input validation can be further improved.

### Future Enhancements
- Expanding the chatbot's knowledge base and response capabilities.
- Implementing more sophisticated natural language processing techniques.
- Adding support for different chat platforms.
