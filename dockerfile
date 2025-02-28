# ---- Step 1: Build Stage ----
    FROM node:18-alpine AS builder

    # Set working directory
    WORKDIR /app
    
    # Copy package.json and package-lock.json first for caching
    COPY package*.json ./
    
    # Install dependencies
    RUN npm install --frozen-lockfile
    
    # Copy source code
    COPY . .
    
    # Build the React app
    RUN npm run build && ls -la build
    
    # ---- Step 2: Run Stage ----
    FROM nginx:alpine
    
    # Remove default nginx static files and copy built React app
    RUN rm -rf /usr/share/nginx/html/*
    
    # Copy React build files from builder stage
    COPY --from=builder /app/build /usr/share/nginx/html
    
    # Expose port
    EXPOSE 80
    
    # Start NGINX
    CMD ["nginx", "-g", "daemon off;"]
    