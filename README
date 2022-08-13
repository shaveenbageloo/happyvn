# Project Title -- Hayvn API Project
This is a project to receive and send messages based on certain OPENAPI formats

## Getting Started
This project can be run via supplied Dockerfile.
I have build and run this on a Mac Book Pro.

## Prerequisites
Download this project: 
    git clone https://github.com/shaveenbageloo/happyvn.git

Docker Stand alone app
    Docker 20 or higher

### Installing
Docker:

Build the image:
docker build . -t shaveenbageloo/happyvn 

Run the image: 
docker run -p 8082:8082 shaveenbageloo/happyvn


Clear out old images & run it again:
docker ps -a -q | xargs docker rm && docker rmi -f $(docker images -a -q) &&  docker build . -t shaveenbageloo/happyvn &&  docker run -p 8082:8082 shaveenbageloo/happyvn

NB: I have exposed port 8082 to work with the project and hit the exposte APIS

### Running
    Open your browser and run:
    http://localhost:8082/health

### Swagger API Docs:
    http://localhost:8082/api-docs


### Testing
You can use postman to execute test messages.
There are time intervals in the .env file that you can adjust and also change the port number if necessary.
