# Frontend Dockerfile (dev)
FROM node:22-alpine

WORKDIR /app

# Copy lockfile and install exact deps
COPY package*.json ./
RUN npm ci

# Copy source (node_modules is ignored via .dockerignore)
COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
