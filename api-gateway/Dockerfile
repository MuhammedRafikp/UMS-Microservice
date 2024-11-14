# Use Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the API Gateway listens on (e.g., 3000)
EXPOSE 3000

# Start the API Gateway service
CMD ["npm", "start"]
