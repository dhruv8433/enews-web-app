# ----- Step 1: Build Stage -----
    FROM node:18-alpine AS builder

    # Set working directory inside the container
    WORKDIR /app
    
    # Copy package.json and package-lock.json to leverage Docker caching
    COPY package.json package-lock.json ./
    
    # Install dependencies
    RUN npm install --frozen-lockfile
    
    # Copy the entire project after installing dependencies
    COPY . .
    
    # Build the Next.js application (static files & optimized assets)
    RUN npm run build
    
    # ----- Step 2: Production Stage -----
    FROM node:18-alpine
    
    # Set working directory for production container
    WORKDIR /app
    
    # Copy only the built files and required dependencies from builder stage
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/package.json ./package.json
    
    # Set environment variable (use production mode)
    ENV NODE_ENV=production
    
    # Expose the port that Next.js runs on
    EXPOSE 3000
    
    # Start the Next.js application
    CMD ["npm", "start"]
    