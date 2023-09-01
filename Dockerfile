# Use an official Node.js runtime as the base image
FROM node:16.14.2

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your NestJS application will run on
EXPOSE 3000

# Command to start the application
CMD ["npm", "run", "start:prod"]