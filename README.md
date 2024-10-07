# Chatnook

## Description
Chatnook is a chat application with user authentication and real-time messaging capabilities. It uses Express for the backend, Mongoose for MongoDB interactions, and Socket.IO for real-time communication.

## Requirements
- Node.js
- MongoDB

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/chatnook.git
    cd chatnook
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```plaintext
    MONGO_URI=mongodb://127.0.0.1:27017/streamAssistantMedia
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```

4. Build the project:
    ```sh
    npm run build
    ```

## Running the Application
1. Start the server:
    ```sh
    npm start
    ```

2. The server will be running at `http://localhost:3000`.

## API Endpoints
### User Authentication
- **Register**: `POST /register`
    - Request Body: `{ "username": "testuser", "password": "password" }`
    - Response: `User registered`

- **Login**: `POST /login`
    - Request Body: `{ "username": "testuser", "password": "password" }`
    - Response: `{ "token": "JWT token" }`

- **Protected Route**: `GET /protected`
    - Headers: `{ "Authorization": "Bearer <token>" }`
    - Response: `This is a protected route`

### Chat Functionality
- **Connect to Chat Server**: Clients can connect to the chat server using Socket.IO.
- **Send Message**: Clients can send messages to the chat server, which will be broadcast to all connected clients.

## Testing
### Unit Tests and Integration Tests (with Super Test)
1. Run unit tests using Jest:
    ```sh
    npm test
    ```

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License
This project is licensed under the Apache License, Version 2.0. See the [LICENSE](LICENSE) file for details.