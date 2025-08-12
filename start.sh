#!/bin/bash

# 🚀 Script de démarrage rapide BookAuto
# Usage: ./start.sh [dev|prod|clean]

set -e

echo "🚗 BookAuto - Démarrage rapide"
echo "================================"

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction d'affichage coloré
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Vérification des prérequis
check_requirements() {
    log_info "Vérification des prérequis..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker n'est pas installé"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose n'est pas installé"
        exit 1
    fi
    
    log_success "Prérequis OK"
}

# Configuration des fichiers .env
setup_env_files() {
    log_info "Configuration des fichiers .env..."
    
    # Backend .env
    if [ ! -f "backend/.env" ]; then
        cp backend/.env.example backend/.env
        log_success "Fichier backend/.env créé"
    else
        log_warning "Le fichier backend/.env existe déjà"
    fi
    
    # Frontend .env
    if [ ! -f "frontend/.env" ]; then
        cp frontend/.env.example frontend/.env
        log_success "Fichier frontend/.env créé"
    else
        log_warning "Le fichier frontend/.env existe déjà"
    fi
}

# Vérification des ports
check_ports() {
    log_info "Vérification des ports..."
    
    if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
        log_warning "Le port 3000 est déjà utilisé"
    fi
    
    if lsof -Pi :5000 -sTCP:LISTEN -t >/dev/null ; then
        log_warning "Le port 5000 est déjà utilisé"
    fi
    
    if lsof -Pi :27017 -sTCP:LISTEN -t >/dev/null ; then
        log_warning "Le port 27017 est déjà utilisé"
    fi
}

# Mode développement
start_dev() {
    log_info "Démarrage en mode développement..."
    docker-compose -f docker-compose.dev.yml up --build
}

# Mode production
start_prod() {
    log_info "Démarrage en mode production..."
    docker-compose --profile production up --build
}

# Nettoyage complet
clean_all() {
    log_warning "Nettoyage complet (suppression des données)..."
    read -p "Êtes-vous sûr ? Cette action supprimera toutes les données (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker-compose down -v
        docker system prune -f
        log_success "Nettoyage terminé"
    else
        log_info "Annulé"
    fi
}

# Affichage des informations de démarrage
show_info() {
    echo
    log_success "🎉 BookAuto est maintenant en cours de démarrage !"
    echo
    echo "📱 Accès à l'application :"
    echo "   Frontend:  http://localhost:3000"
    echo "   Backend:   http://localhost:5000"
    echo "   API Health: http://localhost:5000/health"
    echo
    echo "🔧 Commandes utiles :"
    echo "   Voir les logs:     docker-compose logs -f"
    echo "   Arrêter:          docker-compose down"
    echo "   Redémarrer:       docker-compose restart"
    echo
    echo "📖 Plus d'infos dans README-Docker.md"
    echo
}

# Menu principal
main() {
    MODE=${1:-dev}
    
    case $MODE in
        "dev")
            check_requirements
            setup_env_files
            check_ports
            show_info
            start_dev
            ;;
        "prod")
            check_requirements
            setup_env_files
            check_ports
            show_info
            start_prod
            ;;
        "clean")
            clean_all
            ;;
        *)
            echo "Usage: $0 [dev|prod|clean]"
            echo
            echo "Modes disponibles :"
            echo "  dev   - Mode développement (défaut)"
            echo "  prod  - Mode production"
            echo "  clean - Nettoyage complet"
            exit 1
            ;;
    esac
}

# Gestion de l'interruption (Ctrl+C)
trap 'echo; log_info "Arrêt en cours..."; docker-compose down; exit 0' INT

main "$@"
