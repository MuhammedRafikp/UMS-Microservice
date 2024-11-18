# Use Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./


RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the user service listens on (e.g., 4000)
EXPOSE 5000

# Start the Auth service
CMD ["npm", "start"]



