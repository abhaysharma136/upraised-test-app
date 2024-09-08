# Use the official Node.js image as a base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files to the container
COPY . .

# Expose the port on which the app runs
EXPOSE 3000

# Start the app with npm start
CMD ["npm", "start"]
