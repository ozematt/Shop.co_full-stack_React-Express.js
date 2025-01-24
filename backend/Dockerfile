FROM node:18-alpine

WORKDIR /app
RUN npm install -g nodemon
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3005
CMD ["nodemon", "--legacy-watch", "./src/server.js"]