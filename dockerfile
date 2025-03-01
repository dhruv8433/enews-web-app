# ---- Step 1: Build Stage ----
FROM node:19-alpine AS builder

# Set working directory
WORKDIR /app

# Copy all files
COPY . .

# Install dependencies
RUN npm install

# Start the application
CMD [ "npm", "run", "dev" ]

EXPOSE 3000