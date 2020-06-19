FROM node:12

# Create app directory
WORKDIR /myapp

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install knex
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /myapp

EXPOSE 3000
CMD [ "node", "index.js" ]
# COPY entrypoint.sh /usr/bin/
# RUN chmod +x /usr/bin/entrypoint.sh
# ENTRYPOINT ["entrypoint.sh"]
# CMD ["bash"]