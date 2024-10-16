# Step 1: Use the official Node image from Docker Hub
FROM node:18-alpine as build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the React app for production
RUN npm run build

# Step 7: Serve the app using a lightweight web server
FROM node:18-alpine

# Set working directory for serving the build
WORKDIR /app

# Copy the build files from the previous build stage
COPY --from=build /app/build ./build

# Install serve - a simple static file server
RUN npm install -g serve

# Expose port 3000 to serve the app
EXPOSE 3000

# Command to serve the app
CMD ["serve", "-s", "build", "-l", "3000"]
