# Step 1: Build the React app
FROM node:18-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first (caching layers)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile --legacy-peer-deps

# Copy the entire project to the container
COPY . .

# Build the React app
RUN npm run build

# Step 2: Serve with NGINX
FROM nginx:alpine

# Copy the built React files from the build stage to NGINX's HTML directory
COPY --from=build /app/build /usr/share/nginx/html



# Expose port 80 for the container
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
