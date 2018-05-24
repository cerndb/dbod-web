FROM node:8.11.2

# This image provides a Node.JS environment you can use to run your Node.JS
# applications.

MAINTAINER Jose Andres Cordero Benitez <j.cordero@cern.ch>

WORKDIR /opt/dbod/
# Bundle app source
COPY . /opt/dbod/
RUN tar xvzf dist.tgz && npm install express express-request-proxy express-session jsonwebtoken session-file-store simple-oauth2
RUN chown node:node /opt/dbod/sessions && chmod 0777 /opt/dbod/sessions
USER node
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
