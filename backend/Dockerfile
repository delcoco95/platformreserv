# Dockerfile pour BookAuto Backend
FROM node:18-alpine

# Créer le répertoire de travail
WORKDIR /app

# Installer les dépendances système nécessaires
RUN apk add --no-cache \
    curl \
    bash

# Copier les fichiers de configuration des dépendances
COPY package*.json ./

# Installer toutes les dépendances (dev et prod)
RUN npm ci

# Copier le code source
COPY . .

# Créer les répertoires nécessaires
RUN mkdir -p uploads/images

# Exposer le port
EXPOSE 5000

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Changer les permissions
RUN chown -R nodejs:nodejs /app
USER nodejs

# Commande de démarrage
CMD ["npm", "run", "dev"]
