# Youtube Video Sharing

## Introduction: 
This is a video sharing app with source from youtube. In this website, users can register and login to see the interested videos from others people who already shared though youtube link.

- Register & Login
- Share Youtube Video via Youtube Link
- Use can share Video when they already logged in
- Realtime sharing video update
- Keep realtime update new video from others


## Prerequisites: 
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

### Folder Structure

Folder structure should look like this;

```
src/
├── app.ts
├── config.ts
├── .env
├── wss
│   └── index.ts
├── types
│   └── %typeName%.d.ts
├── helpers
│   └── %helperName%.scss
├── routes
│   ├── %ModuleName%
│   │   ├── index.ts
│   │   ├── schema.ts
│   └── index.tsx (router)
├── database
│   ├── model
│   │   └── %modmodelName%.ts
│   ├── repository
│   │   └── %repoName%.ts
│   └── index.ts
├── cache
│   └── index.ts
├── core
│   └── %coreName%.ts
└── auth
    └── %authName%.ts

```

### Test Folder

```
test/
├── setup.ts
├── .env
├── routes %ModuleName%
│   └── %ModuleName%
│       ├── mock.ts
│       └── unit.test.ts
├── database
│   └── mock.ts
├── core %ModuleName%
│   └── %ModuleName%
│       ├── mock.ts
│       └── unit.test.ts
└── auth %ModuleName%
    └── %ModuleName%
        ├── mock.ts
        └── unit.test.ts
```


## Installation & Configuration:
Required [Node.js](https://nodejs.org/) v16+ to run.

Install the dependencies and devDependencies

### Backend
```sh
cd backend
npm i
```

### Frontend
```sh
cd youtube-sharing
cd frontend
npm i
```

For Production install...
```sh
npm i --production
```
or 
```sh
set NODE_ENV=production npm i
```

Next step
- Copy file `.env.example` and change name to `.env`
- Edit `.env` file to suitable with your environment

## Database Setup: 
For setup database though Docker...

Required [Docker & Docker Compose](https://www.docker.com/) to run.

You must change the config in `docker-compose.yml` to make it suitable with your environment

_Some line you need to change in `docker-compose.yml`_ 
- line `51` and `63`: there are local space where storing your data in docker

To Pull and setup Docker Database such as mongoDB and Redis
```sh
docker-compose up -d
```
> This is sample database and you can run docker compose again when you
> already build your application successfully.


## Running the Application:
After build and start database thought Docker you can run application
You need to change port in `.env` file at Frontend repo if you already changed it in backend repo

Run development
_You can run this command for both frontend and backend_
```sh
npm run dev
```

To build and run like production
```sh
npm run start
```

### Test

#### Backend 
To run test in Backend repo run 

Test all file test
```sh
npm run test
```

Test one file only
```sh
npm run test ./tests/pathtoyourfile
```

### Frontend
_Coming soon_

### API with Postman
In folder `<root>/postman` using `auth.postman_collection.json` and `remi.postman_environment.json` 
To setup your environment test through Postman

## (BE/FS) Docker Deployment: 
Easy way to setup and build this app throw Docker

### Backend 
You need to run code below to make sure your source can run 
```sh
npm run eslint
npm run format
npm run check
npm run start
```

And then...
_docker CLI required_
```sh
docker buildx build ./ --tag v1
```

Now you application was built and run though image container 

Start app
_docker-compose required_
```sh
docker-compose up -d
```

### Frontend

Run check build your Front End App 
```sh
npm run lint
npm run format
npm run build
```

And then...
_docker CLI required_
```sh
docker buildx build ./ --tag frontend
```

To start your app as Docker image 
_docker-compose required_
```sh
docker-compose up -d
```

### Deployment step - in current situation

1. Setup Docker and login with your [Docker Hub](https://hub.docker.com/repository/) account 
```sh
docker login
```

2. Build NodeJS by Docker Build
```sh
docker buildx build ./ --tag <your-account>/remi
```

3. After that, push your build to Docker Hub
```sh
docker push <your-account>/remi:latest
```

4. Setup your [Koyeb](https://app.koyeb.com/) and link to your Docker Hub

5. Deploy your Nodejs App on Koyeb and get `API URL`

6. Change API domain in `./frontend/.env` file
> Note: you must change API for VITE_WEB_SOCKET and VITE_API_BASE_URL also

7. Run check build your Front End App 
```sh
npm run lint
npm run format
npm run test
npm run build
```

8. Setup your Azure account
_SWA CLI required_
```sh
swa login 
swa init
```
9. Change your config in file `./frontend/swa-cli.config.json`

10. Deploy
```sh
swa deploy
```

## Usage

### Create new API key to allow you application to access the BE
    1. Use API `/api/v1/apikey/create` method POST to create your API KEY.
    2. Push your API Key to Headers with key `x-api-key`

### Create new certificates
- You need to create new certificates for JWT

##### You can generate these keys at
[RSA Key Generator](https://cryptotools.net/rsagen)


#### For CLI generation follow this doc
[Github - How to generate JWT RS256 key](https://gist.github.com/ygotthilf/baa58da5c3dd1f69fae9)

> You can copy current certificate in folder `keys` and change name following file readme.md in this folder

### Using website

After start your localhost you can see home page
![Home Page](/images/home.png "Home Page")

Click Sign Up [Top - Right] to Create new User account and then you can share video by yourself
![Sign Up](/images/signup.png "Sign Up")

After register, you need to login to share video
![Login](/images/login.png "Login")

This view is Home Page after you logged in and you can logout with logout button on the top right
![Logged In](/images/logged-in.png "Logged In")

Click Share Video on the top right to share your interested videos
![Share Video](/images/logged-in.png "Share Video")


## Troubleshooting

- In case not found variables, change file's name `.env.example` to `.env`
- To setup test, you must use `.env.test` and using certs in folder `./keys`


## Drawback
- I try to optimize docker build but I have some problems with my environment and it take 10 minutes for running build so I will push it into TODO list
- I spent a lot of time to setup backend and alias path. That is why my Front end did not have alias and full test file
- My websocket not work like my expected that why I push it in the other port and using search param to push token 

