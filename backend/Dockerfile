FROM node:18
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --no-frozen-lockfile --no-optional
COPY . .
ENV NODE_ENV=production
EXPOSE 4000
CMD ["node","server.js"]
