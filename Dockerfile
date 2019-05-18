# Get the Node.js image from Docker Hub
FROM node:11.13.0-alpine

# Expose port 5000 to run the server on
EXPOSE 5000

# Create a working directory and cd to it
RUN mkdir /client
WORKDIR /client

# Copy over our package.json and install its dependencies
COPY client/package.json /client
COPY client/package-lock.json /client
RUN npm install

# Copy over all of our source files
COPY client /client

# Build client app
RUN npm run build

# End of client setup
WORKDIR /

# Create a working directory and cd to it
RUN mkdir /server
WORKDIR /server

# Copy over our package.json and install its dependencies
COPY server/package.json /server
COPY server/package-lock.json /server
RUN npm install

# Copy over all of our source files
COPY server /server

# Start our Node.js server
CMD ["npm", "start"]
