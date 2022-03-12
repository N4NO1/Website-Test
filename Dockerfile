FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
ENV PORT = 3000

#start the service
CMD "ifconfig"
CMD ["node","server.js"]



#confirm Installs
RUN node -v
RUN npm -v