# Get the Node.js image from Docker Hub
FROM node:11.13.0-alpine

# Expose port 5000 to run the server on
EXPOSE 5000

# Create a working directory and cd to it
RUN mkdir /server
WORKDIR /server

# Copy over our package.json and install its dependencies
COPY package.json /server
COPY package-lock.json /server
RUN npm install

# Copy over all of our source files
COPY . /server

# Start our Node.js server
CMD ["npm", "start"]
