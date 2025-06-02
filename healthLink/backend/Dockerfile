# Use official Node.js image as the base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies inside the container
RUN npm install --legacy-peer-deps

# Copy the rest of your application code to the container
COPY . .

# Expose the port that your app will run on
EXPOSE 3001

# Command to run your app (adjust as needed for your entry point)
CMD ["node", "server.js"]
