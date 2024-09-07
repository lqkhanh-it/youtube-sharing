# Youtube Video Sharing

## Introduction: 
This is a video sharing app with source from youtube. In this website, users can register and login to see the interested videos from others people who already shared though youtube link.

- Register & Login
- Share Youtube Video via Youtube Link
- Use can share Video when they already logged in
- Realtime sharing video update
- Keep realtime update new video from others


## Prerequisites: 
_List required software and tools, along with their appropriate versions._

There are some technology used in this project:

### Backend Libraries

- [**NodeJS**](https://nodejs.org/en/) - v20.10.0 - JavaScript runtime built on Chrome's V8 engine, used for backend event-driven I/O.
- [**ExpressJS**](https://expressjs.com/) - v4.19.2 - Fast and minimalist web framework for Node.js, used for building network applications.
- [**Websocket (ws)**](https://github.com/websockets/ws) - v8.18.0 - WebSocket client and server for real-time communication in Node.js.
- [**app-request**](https://www.npmjs.com/package/app-request) - ^1.0.2 - Simplifies HTTP request creation and handling.
- [**bcrypt**](https://www.npmjs.com/package/bcrypt) - ^5.1.1 - Library to hash passwords for secure authentication.
- [**cors**](https://www.npmjs.com/package/cors) - ^2.8.5 - Middleware to enable Cross-Origin Resource Sharing (CORS) in Express.js.
- [**dotenv**](https://www.npmjs.com/package/dotenv) - ^16.4.5 - Loads environment variables from a `.env` file into `process.env`.
- [**joi**](https://joi.dev/) - ^17.13.3 - Schema validation library for JavaScript to ensure data integrity.
- [**jsonwebtoken**](https://www.npmjs.com/package/jsonwebtoken) - ^9.0.2 - Implementation of JSON Web Tokens (JWT) for secure token-based authentication.
- [**lodash**](https://lodash.com/) - ^4.17.21 - Utility library delivering modularity, performance, and extra features for JavaScript.
- [**mongoose**](https://mongoosejs.com/) - ^8.6.0 - Elegant MongoDB object modeling for Node.js, providing schema-based solutions.
- [**redis**](https://www.npmjs.com/package/redis) - ^4.7.0 - Redis client for Node.js, allowing caching, message brokering, and more.
- [**winston**](https://github.com/winstonjs/winston) - ^3.14.2 - Versatile logging library for Node.js applications.
- [**winston-daily-rotate-file**](https://www.npmjs.com/package/winston-daily-rotate-file) - ^5.0.0 - Transport for `winston` that rotates logs daily.

### Frontend Libraries

- [**@ant-design/icons**](https://www.npmjs.com/package/@ant-design/icons) - ^5.3.1 - Icon library for Ant Design components, providing a wide range of vector icons.
- [**@reduxjs/toolkit**](https://redux-toolkit.js.org/) - ^2.2.1 - Official, recommended way to write Redux logic, offering a simple API to handle state management.
- [**antd**](https://ant.design/) - ^5.20.5 - Comprehensive React UI component library with a modern design and extensive components.
- [**axios**](https://axios-http.com/) - ^1.7.7 - Promise-based HTTP client for the browser and Node.js, commonly used for API calls.
- [**buffer**](https://www.npmjs.com/package/buffer) - ^6.0.3 - Provides a way to handle binary data in Node.js and browsers.
- [**react**](https://reactjs.org/) - ^18.2.0 - A JavaScript library for building user interfaces, using a component-based architecture.
- [**react-dom**](https://www.npmjs.com/package/react-dom) - ^18.2.0 - Package that serves as the entry point to the DOM and server renderers for React.
- [**react-player**](https://www.npmjs.com/package/react-player) - ^2.16.0 - A React component for playing media from a variety of sources including YouTube and Vimeo.
- [**react-redux**](https://react-redux.js.org/) - ^9.1.0 - Official React bindings for Redux, enabling React components to read from and dispatch actions to a Redux store.
- [**react-router-dom**](https://reactrouter.com/) - 6.22.2 - Declarative routing library for React, designed for creating single-page applications (SPA).


## Installation & Configuration: 
Required [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies

```sh
cd backend
npm i
```

## Database Setup: 
For setup database though Docker...

_Required Docker Compose_

Pull and setup Docker Database such as mongoDB and Redis
You must change the config in `docker-compose.yml` to make it suitable with your environment
```sh
docker-compose up -d
```

## Running the Application:
After build and start database thought Docker you can run application

Run development
```sh
    npm run dev
```

To build and run like production
```sh
    npm run start
```

## (BE/FS) Docker Deployment: 
Easy way to setup and build this app throw Docker

You need to run code below to make sure your source can run 
```sh
npm run start
```

And then...
_docker CLI required_
```sh
    docker buildx build ./ --tag v1
```
Now you application was built and run though image container 

## Usage

### Create new API key to allow you application to access the BE
    1. Use API `/api/v1/apikey/create` method POST to create your API KEY.
    2. Push your API Key to Headers with key `x-api-key`


## Troubleshooting

- In case not found variables, change file's name `.env.example` to `.env`
- To setup test, you must use `.env.test` and using certs in folder ./keys