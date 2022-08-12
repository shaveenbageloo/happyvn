FROM node:16-alpine3.16
WORKDIR /app
COPY package*.json /app
RUN npm install --force
COPY . /app/
CMD ["npm","run","start"] 
EXPOSE 8082