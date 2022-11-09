FROM node:16
RUN mkdir -p /node/node_modules && chown -R node:node /node

# Create app directory
WORKDIR /node

COPY package*.json ./
COPY . ./
RUN npm install
CMD ["npm", "gdocs2md/scripts/start-express2.js"]

EXPOSE 3000