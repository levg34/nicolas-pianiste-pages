# ---- Build Stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.15.1 --activate

# Copy dependency manifests
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including devDependencies needed for build)
RUN pnpm install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Build the app – this creates .output (the Nitro server) and .vinxi/build
RUN pnpm build

# ---- Production Stage ----
FROM node:20-slim AS runner
WORKDIR /app

# Install pnpm again (needed to run pnpm install --prod)
RUN corepack enable && corepack prepare pnpm@9.15.1 --activate

# Copy only production dependency manifests
COPY package.json pnpm-lock.yaml ./

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

# Copy the built Nitro server from the builder stage
COPY --from=builder /app/.output ./.output

# Expose the port your app runs on
EXPOSE 3000

# Start the Nitro server
CMD ["node", ".output/server/index.mjs"]