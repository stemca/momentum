# Stage 1: Build the application
FROM node:22-bookworm-slim AS build

# Set working directory and install dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Set the environment variables required for the build (not for the runtime)
ARG DATABASE_URL
ARG DISCORD_CLIENT_ID
ARG DISCORD_CLIENT_SECRET
ARG DISCORD_CALLBACK_URL
ARG NEXT_PUBLIC_BASE_URL
ENV NODE_ENV=production
ENV DATABASE_URL=$DATABASE_URL
ENV DISCORD_CLIENT_ID=$DISCORD_CLIENT_ID
ENV DISCORD_CLIENT_SECRET=$DISCORD_CLIENT_SECRET
ENV DISCORD_CALLBACK_URL=$DISCORD_CALLBACK_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

# Build the application
RUN corepack enable pnpm && pnpm run build

LABEL org.opencontainers.image.source=https://github.com/OWNER/REPO

# Stage 2: Prepare the production environment (clean and minimal)
FROM node:22-bookworm-slim AS production

# Set working directory
WORKDIR /app

# Copy the built application from the build stage
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

# Set production environment variables (do not expose secrets)
ENV NODE_ENV=production
ENV PORT=8000

# Expose the port that the app will run on
EXPOSE 8000

# Start the production server
CMD ["node", ".next/standalone/server.js"]
