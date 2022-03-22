FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 8000

ENV PORT=8000

#start the service
CMD ["node","server.js"]
