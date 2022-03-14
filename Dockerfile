FROM node:14-stretch

COPY package.json .

WORKDIR /home/node/app


COPY . .
EXPOSE 3000
USER node
ENV PORT = 3000

#start the service
CMD ["node","server.js"]
