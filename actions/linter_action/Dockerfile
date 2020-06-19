FROM node:12

# RUN apk add --update build-base git

RUN npm install --save-dev eslint eslint-config-google
RUN npm install knex


COPY lib /action/lib
RUN chmod +x /action/lib/entrypoint.sh

ENTRYPOINT ["/action/lib/entrypoint.sh"]