FROM node:18

WORKDIR /app

# Install pnpm (build-time)
RUN npm install -g pnpm

# Copy package files first for caching
COPY package.json pnpm-lock.yaml* ./

# Install deps without frozen-lockfile (allow builds when lockfile mismatches)
RUN pnpm install --no-frozen-lockfile --no-optional

# Copy source
COPY . .

# Production env
ENV NODE_ENV=production
EXPOSE 4000

# Run production server (server should read process.env.PORT)
CMD ["node", "server.js"]
