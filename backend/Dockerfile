FROM node:18

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy only package files first to leverage layer caching
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile --no-optional

# Copy source
COPY . .

# Use production env
ENV NODE_ENV=production
EXPOSE 4000

# Use the production start script
CMD ["node", "server.js"]
