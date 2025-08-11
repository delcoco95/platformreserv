# Dockerfile pour RendezVousPro
FROM node:18-alpine AS base

# Étape 1: Build du frontend
FROM base AS frontend-builder
WORKDIR /app
COPY package*.json ./
COPY client/package*.json ./client/
RUN npm install
COPY client/ ./client/
COPY *.config.* ./
COPY components.json ./
RUN npm run build:client

# Étape 2: Build du backend
FROM base AS backend-builder
WORKDIR /app
COPY backend/package*.json ./backend/
RUN cd backend && npm install --only=production

# Étape 3: Production
FROM base AS production
WORKDIR /app

# Copier les builds
COPY --from=frontend-builder /app/dist ./dist
COPY --from=backend-builder /app/backend ./backend
COPY backend/ ./backend/

# Variables d'environnement par défaut
ENV NODE_ENV=production
ENV PORT=5000

# Port exposé
EXPOSE 5000

# Démarrage
WORKDIR /app/backend
CMD ["npm", "start"]
