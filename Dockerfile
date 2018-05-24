
FROM gitlab-registry.cern.ch/db/dbod-web-base:latest

# This image provides a Node.JS environment you can use to run your Node.JS
# applications.

MAINTAINER Jose Andres Cordero Benitez <j.cordero@cern.ch>

WORKDIR /opt/dbod/
# Bundle app source
COPY ./dist.tgz /opt/dbod/

RUN tar xvzf dist.tgz

RUN chown node:node /opt/dbod/sessions && chmod 0777 /opt/dbod/sessions
USER node
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
