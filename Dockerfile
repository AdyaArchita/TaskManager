FROM node:18-alpine

# Use /app as the working directory
WORKDIR /app

# Copy package files and install all dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the API and Frontend port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
