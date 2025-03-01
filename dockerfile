# ---- Step 1: Build Stage ----
FROM node:19-alpine AS builder

# Set working directory
WORKDIR /app

# Env
ENV NEXT_PUBLIC_NEWS_KEY=01uEks4iOHkcbSdtliMT0tUez1eJtFMa
ENV NEXT_PUBLIC_WEATHER_SECRET_KEY = 0d8e40b0e016472d82f83442251702

# Copy all files
COPY . .

# Install dependencies
RUN npm install

# Start the application
CMD [ "npm", "run", "dev" ]

EXPOSE 3000