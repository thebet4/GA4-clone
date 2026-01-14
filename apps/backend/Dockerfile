FROM node:22-slim

WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# The command will be overridden in docker-compose for the worker
CMD ["npm", "run", "start"]
