# Container image for the GuruPDF MCP server (stdio transport).
#
# Used by Glama (and anyone who wants to run it in a container) to build the
# server and answer MCP introspection. No API key is needed to boot or to list
# tools — a GURUPDF_API_KEY is only required to actually run a conversion.
#
#   docker build -t gurupdf-mcp .
#   docker run -i --rm -e GURUPDF_API_KEY=... gurupdf-mcp

# ── build ────────────────────────────────────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json tsconfig.json ./
RUN npm ci
COPY src ./src
RUN npm run build

# ── runtime ──────────────────────────────────────────────────────────────
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist
# stdio MCP server — the client speaks JSON-RPC over stdin/stdout.
ENTRYPOINT ["node", "dist/index.js"]
