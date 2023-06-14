FROM node:alpine AS pruner
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN npm install -g pnpm
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=next --docker

FROM node:alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN npm install -g pnpm
RUN npm install -g turbo
# First install the dependencies (as they change less often)
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install
# Build the project
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json
ENV NEXT_PUBLIC_API_URL=https://mylifehub-api.becker-hosting.de
RUN turbo run build --filter=next...

FROM node:alpine AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/apps/next/next.config.js .
COPY --from=builder /app/apps/next/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder  /app/apps/next/.next/standalone ./
COPY --from=builder  /app/apps/next/.next/static ./apps/next/.next/static
COPY --from=builder  /app/apps/next/public ./apps/next/public

CMD node apps/next/server.js