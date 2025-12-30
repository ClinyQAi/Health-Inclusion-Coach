# Node.js build image
FROM node:20-slim AS build

WORKDIR /app

# Copy configuration files
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Set environment variable during build (optional, if needed for build-time constants)
ARG GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=$GEMINI_API_KEY

# Build the app
RUN npm run build

# Production image - serve with node (simple server for HF Spaces)
FROM node:20-slim

WORKDIR /app

# Install 'serve' package to serve the static build
RUN npm install -g serve

# Copy built files from build stage
COPY --from=build /app/dist ./dist

# Create a simple .env file for runtime if needed (though usually handled via environment variables)
# EXPOSE 7860 is the default port for Hugging Face Spaces
EXPOSE 7860

# Command to serve the application on port 7860
CMD ["serve", "-s", "dist", "-l", "7860"]
