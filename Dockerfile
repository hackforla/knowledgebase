FROM node:16-alpine
# RUN mkdir -p /node/node_modules && chown -R node:node /node

# Create app directory
WORKDIR /node

COPY ./utils/package*.json ./
COPY ./utils ./
# RUN npm install
# CMD ["npm", "gdocs2md/scripts/start-express2.js"]

EXPOSE 3000