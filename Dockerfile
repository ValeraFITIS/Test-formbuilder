FROM node:8.12

# Create workdir and copy package.json
RUN mkdir -p /app
WORKDIR /app
COPY app/package*.json /app/

# Install packages
RUN npm install