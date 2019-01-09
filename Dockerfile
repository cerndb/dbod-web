FROM gitlab-registry.cern.ch/db/dbod-web-base:latest

# This image provides a Node.JS environment you can use to run your Node.JS
# applications.

MAINTAINER Ignacio Coterillo <ignacio.coterillo@cern.ch>

USER node
WORKDIR /opt/dbod/
# Bundle app source
COPY server.js ./dist.tgz /opt/dbod/
COPY package-server.json /opt/dbod/package.json
COPY server/ /opt/dbod/server
RUN tar xvzf dist.tgz >/dev/null 2>&1
RUN mkdir -p /opt/dbod/downloads 
RUN chown -R node:node /opt/dbod/sessions /opt/dbod/downloads && chmod 0777 /opt/dbod/sessions /opt/dbod/downloads
EXPOSE 3000
ENV NODE_EXTRA_CA_CERTS=CERN-CA.pem 
ENTRYPOINT ["npm", "start"]
