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

Install the dependencies and devDependencies and start the server.

```sh
cd backend
npm i
npm run dev
```

For production environments...

```sh
npm install --production
NODE_ENV=production npm run build & npm start
```

## Database Setup: 
_Instructions for setting up the database, running migrations, and seeding data if necessary._

For setup database though Docker...

_Required Docker Compose_

```sh
docker-compose up
```

## Running the Application:
_How to start the development server, access the application in a web browser, and run the test suite._

## (BE/FS) Docker Deployment: 
_Instructions for deploying the application using Docker, including building the Docker image and running containers (optional for Backend developers)_

## Usage
_A brief guide outlining how to use the application, including any specific features or functionality the reviewer should be aware of_.

## Troubleshooting
_Common issues that may arise during setup and their potential solutions._

- In case not found variables, change file's name `.env.example` to `.env`