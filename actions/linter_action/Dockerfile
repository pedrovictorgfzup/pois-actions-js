FROM node:12

# RUN apk add --update build-base git

RUN npm install eslint
RUN npm install knex


COPY lib /action/lib
RUN chmod +x /action/lib/entrypoint.sh

ENTRYPOINT ["/action/lib/entrypoint.sh"]