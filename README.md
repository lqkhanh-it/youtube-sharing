# Youtube Video Sharing

## Introduction: 
_A brief overview of the project, its purpose, and key features._

This is a video sharing app with source from youtube. In this website, users can register and login to see the interested videos from others people who already shared though youtube link.

- Register & Login
- Share Youtube Video via Youtube Link
- Realtime sharing video update


## Prerequisites: 
_List required software and tools, along with their appropriate versions._

There are some technology used in this project:

### Backend
- [NodeJS] - v20.10.0 - evented I/O for the backend
- [ExpressJS] - v4.19.2 - fast node.js network app framework
- [Websocket] - v8.18.0 - the realtime notification system

## Installation & Configuration: 
_Step-by-step instructions for cloning the repository, installing dependencies, and configuring settings._

Required [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies

```sh
cd backend
npm i
```

## Database Setup: 
_Instructions for setting up the database, running migrations, and seeding data if necessary._

For setup database though Docker...

_Required Docker Compose_

Pull and setup Docker Database such as mongoDB and Redis
You must change the config in `docker-compose.yml` to make it suitable with your environment
```sh
docker-compose up -d
```

## Running the Application:
_How to start the development server, access the application in a web browser, and run the test suite._
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
_Instructions for deploying the application using Docker, including building the Docker image and running containers (optional for Backend developers)_
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
_A brief guide outlining how to use the application, including any specific features or functionality the reviewer should be aware of_.

### Create new API key to allow you application to access the BE
    1. Use API `/api/v1/apikey/create` method POST to create your API KEY.
    2. Push your API Key to Headers with key `x-api-key`


## Troubleshooting
_Common issues that may arise during setup and their potential solutions._

- In case not found variables, change file's name `.env.example` to `.env`
- To setup test, you must use `.env.test` and using certs in folder ./keys