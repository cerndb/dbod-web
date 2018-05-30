FROM gitlab-registry.cern.ch/db/dbod-web-base:latest

# This image provides a Node.JS environment you can use to run your Node.JS
# applications.

MAINTAINER Ignacio Coterillo <ignacio.coterillo@cern.ch>

WORKDIR /opt/dbod/
# Bundle app source
COPY server.js ./dist.tgz /opt/dbod/
COPY server/ /opt/dbod/server
RUN tar xvzf dist.tgz
RUN chown node:node /opt/dbod/sessions && chmod 0777 /opt/dbod/sessions
USER node
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
