# Use a node image suitable for production
FROM node:lts AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Remove the `prepare` script to avoid running Husky
RUN npm pkg delete scripts.prepare

# Install dependencies (include HUSKY=0 to disable Husky hooks)
RUN HUSKY=0 npm install

# Copy the rest of the application code
COPY . .

# Build the app (if you have a build step)
RUN npm run build

# Production image
FROM node:lts AS production

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json for production dependencies
COPY package*.json ./

# Remove the `prepare` script to avoid running Husky
RUN npm pkg delete scripts.prepare

# Disable Husky and install only production dependencies
RUN npm ci --omit=dev

# Copy the build output from the build stage
COPY --from=build /app/dist ./dist

# Expose the port and start the application
EXPOSE 3000
CMD ["node", "dist/src/index.js"]
