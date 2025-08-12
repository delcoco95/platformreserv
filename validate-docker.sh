#!/bin/bash

# 🔍 Script de validation de l'installation Docker BookAuto
# Vérifie que tout est prêt pour le déploiement

set -e

echo "🔍 Validation de l'installation BookAuto Docker"
echo "=============================================="

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

success=0
warnings=0
errors=0

check_success() {
    echo -e "${GREEN}✅ $1${NC}"
    ((success++))
}

check_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
    ((warnings++))
}

check_error() {
    echo -e "${RED}❌ $1${NC}"
    ((errors++))
}

check_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# 1. Vérification des prérequis
echo "📋 Vérification des prérequis..."
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version | cut -d' ' -f3 | cut -d',' -f1)
    check_success "Docker installé (version $DOCKER_VERSION)"
else
    check_error "Docker n'est pas installé"
fi

if command -v docker-compose &> /dev/null; then
    COMPOSE_VERSION=$(docker-compose --version | cut -d' ' -f3 | cut -d',' -f1)
    check_success "Docker Compose installé (version $COMPOSE_VERSION)"
else
    check_error "Docker Compose n'est pas installé"
fi

# 2. Vérification des fichiers de configuration
echo -e "\n📁 Vérification des fichiers de configuration..."

# Docker Compose files
if [ -f "docker-compose.yml" ]; then
    check_success "docker-compose.yml présent"
else
    check_error "docker-compose.yml manquant"
fi

if [ -f "docker-compose.dev.yml" ]; then
    check_success "docker-compose.dev.yml présent"
else
    check_error "docker-compose.dev.yml manquant"
fi

# Dockerfiles
if [ -f "backend/Dockerfile" ]; then
    check_success "backend/Dockerfile présent"
else
    check_error "backend/Dockerfile manquant"
fi

if [ -f "frontend/Dockerfile" ]; then
    check_success "frontend/Dockerfile présent"
else
    check_error "frontend/Dockerfile manquant"
fi

if [ -f "frontend/Dockerfile.dev" ]; then
    check_success "frontend/Dockerfile.dev présent"
else
    check_error "frontend/Dockerfile.dev manquant"
fi

# 3. Vérification des fichiers .env
echo -e "\n🔐 Vérification des fichiers .env..."

if [ -f "backend/.env" ]; then
    check_success "backend/.env présent"
    # Vérifier les variables essentielles
    if grep -q "MONGO_URI" backend/.env; then
        check_success "MONGO_URI configuré"
    else
        check_error "MONGO_URI manquant dans backend/.env"
    fi
    
    if grep -q "JWT_SECRET" backend/.env; then
        check_success "JWT_SECRET configuré"
    else
        check_error "JWT_SECRET manquant dans backend/.env"
    fi
else
    check_error "backend/.env manquant"
fi

if [ -f "frontend/.env" ]; then
    check_success "frontend/.env présent"
    if grep -q "VITE_API_URL" frontend/.env; then
        check_success "VITE_API_URL configuré"
    else
        check_error "VITE_API_URL manquant dans frontend/.env"
    fi
else
    check_error "frontend/.env manquant"
fi

# 4. Vérification de la structure des dossiers
echo -e "\n📂 Vérification de la structure..."

if [ -d "backend" ]; then
    check_success "Dossier backend présent"
else
    check_error "Dossier backend manquant"
fi

if [ -d "frontend" ]; then
    check_success "Dossier frontend présent"
else
    check_error "Dossier frontend manquant"
fi

if [ -d "scripts" ]; then
    check_success "Dossier scripts présent"
else
    check_warning "Dossier scripts manquant (optionnel)"
fi

# 5. Vérification des package.json
echo -e "\n📦 Vérification des packages..."

if [ -f "backend/package.json" ]; then
    check_success "backend/package.json présent"
else
    check_error "backend/package.json manquant"
fi

if [ -f "frontend/package.json" ]; then
    check_success "frontend/package.json présent"
else
    check_error "frontend/package.json manquant"
fi

# 6. Vérification des ports
echo -e "\n🌐 Vérification des ports..."

if ! lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    check_success "Port 3000 disponible"
else
    check_warning "Port 3000 déjà utilisé (frontend)"
fi

if ! lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    check_success "Port 5000 disponible"
else
    check_warning "Port 5000 déjà utilisé (backend)"
fi

if ! lsof -Pi :27017 -sTCP:LISTEN -t >/dev/null 2>&1; then
    check_success "Port 27017 disponible"
else
    check_warning "Port 27017 déjà utilisé (MongoDB)"
fi

# 7. Résumé
echo -e "\n📊 Résumé de la validation:"
echo "=========================="
echo -e "${GREEN}✅ Succès: $success${NC}"
if [ $warnings -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Avertissements: $warnings${NC}"
fi
if [ $errors -gt 0 ]; then
    echo -e "${RED}❌ Erreurs: $errors${NC}"
fi

echo -e "\n🚀 Commandes de démarrage:"
if [ $errors -eq 0 ]; then
    echo "   Développement:  docker-compose -f docker-compose.dev.yml up --build"
    echo "   Production:     docker-compose --profile production up --build"
    echo "   Script rapide:  ./start.sh dev"
    echo ""
    check_success "Configuration validée ! Vous pouvez démarrer BookAuto"
else
    echo ""
    check_error "Des erreurs doivent être corrigées avant de démarrer"
    echo ""
    echo "📖 Consultez README-Docker.md pour plus d'informations"
fi

exit $errors
