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


### Improvements
Authentication:
    We should use a token that expires in 60 seconds.  We can use Azure B2C to generate this token and the API calls can be enhanced with the @UseBefore decorator.  This will ensure that the token is validated with each and every API call that is made.

Performance Boost:
    Here we could enable Azure Service Bus (or Kafka).  This could gather multiple messages from many sources and we could separate them into different topics on the Azure Service Bus service.  This will also ensure fault tolerance and a First in First Out approach.
    After 10 secs an Azure Function could run and read all messages of the que and batch them to send the final API endpoint. 

