FROM node:16-alpine3.16
WORKDIR /app
COPY package*.json /app
# RUN npm ci --only=production && npm cache clean --force
RUN npm install
COPY . /app/
CMD ["npm","run","start"] 
EXPOSE 8082