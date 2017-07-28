
FROM node:8.2.1

# This image provides a Node.JS environment you can use to run your Node.JS
# applications.

MAINTAINER Jose Andres Cordero Benitez <j.cordero@cern.ch>

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

RUN npm install && npm i @angular/cli && npm cache clean --force
ENV PATH="/usr/src/app/node_modules/.bin:${PATH}"
RUN ng build

EXPOSE 3000
ENTRYPOINT ["npm", "start"]