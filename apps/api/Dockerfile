FROM node:22-slim AS base

FROM base AS pnpm
WORKDIR /app
RUN apt update
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm && corepack install -g pnpm@latest-9

FROM pnpm AS builder
RUN pnpm install turbo --global
COPY . .
RUN turbo prune @ara/api --docker

FROM pnpm AS installer
COPY --from=builder /app/out/json/ .
RUN pnpm install
COPY --from=builder /app/out/full/ .
RUN pnpm turbo build --filter=@ara/api...

FROM base AS runner
RUN addgroup --system --gid 1001 ara
RUN useradd -m -r -g 1001 -u 1001 ara
USER ara
WORKDIR /home/ara/app
COPY --from=installer /app .

CMD ["node", "apps/api/dist/index.js"]
