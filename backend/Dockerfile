# Dockerfile for Node.js Backend

# Use an official Node runtime as a parent image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5000
EXPOSE 5000

# Start the backend server
CMD ["node", "server2.js"]
