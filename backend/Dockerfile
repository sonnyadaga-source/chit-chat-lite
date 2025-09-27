FROM node:20

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY ./src ./src

# Expose API port
EXPOSE 4000

# Start server
CMD ["node", "src/index.js"]
