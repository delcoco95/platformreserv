#!/bin/bash

# Script de déploiement pour RendezVousPro
echo "🚀 Déploiement de RendezVousPro"

# Vérification des prérequis
echo "📋 Vérification des prérequis..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé"
    exit 1
fi

echo "✅ Node.js et npm sont installés"

# Installation des dépendances
echo "📦 Installation des dépendances..."
npm install
cd backend && npm install && cd ..

# Build du projet
echo "🔨 Build du projet..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build réussi !"
else
    echo "❌ Erreur lors du build"
    exit 1
fi

# Configuration des variables d'environnement
echo "⚙️ Configuration de l'environnement..."

if [ ! -f .env ]; then
    cp .env.example .env
    echo "📝 Fichier .env créé, veuillez le configurer"
fi

if [ ! -f backend/.env ]; then
    echo "MONGO_URI=mongodb://localhost:27017/rendezvous-pro" > backend/.env
    echo "JWT_SECRET=your-super-secret-jwt-key" >> backend/.env
    echo "PORT=5000" >> backend/.env
    echo "📝 Fichier backend/.env créé"
fi

echo "🎉 Déploiement terminé !"
echo ""
echo "📚 Pour démarrer l'application :"
echo "   Frontend: npm run dev"
echo "   Backend:  cd backend && npm start"
echo ""
echo "🌐 URLs par défaut :"
echo "   Frontend: http://localhost:8080"
echo "   Backend:  http://localhost:5000"
