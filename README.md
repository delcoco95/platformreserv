# 🚗 BookAuto - Plateforme de Réservation Automobile

[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](docker-compose.yml)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](frontend/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](backend/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7+-green.svg)](docker-compose.yml)

BookAuto est une plateforme moderne et intuitive qui révolutionne la prise de rendez-vous entre particuliers et professionnels automobiles. Inspirée de Planity, elle offre une expérience utilisateur fluide et des fonctionnalités avancées de gestion.

![BookAuto Screenshot](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=BookAuto+Platform)

## 🚀 Démarrage rapide avec Docker

```bash
# 1. Cloner le repository
git clone <votre-repo-url>
cd bookauto

# 2. Démarrer avec le script automatique
./start.sh dev

# OU manuellement :
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
docker-compose -f docker-compose.dev.yml up --build
```

**Accès immédiat :**
- 🌐 Frontend: http://localhost:3000
- 🔧 Backend API: http://localhost:5000
- 📊 Health Check: http://localhost:5000/health

## ✨ Fonctionnalités

### 👥 Pour les Clients
- 🔍 **Recherche avancée** de professionnels par localisation et services
- 📅 **Réservation en ligne** avec créneaux disponibles en temps réel
- 💬 **Messagerie intégrée** avec les professionnels
- ⭐ **Système d'avis et notes** pour guider les choix
- 📱 **Interface responsive** optimisée mobile et desktop

### 🔧 Pour les Professionnels
- 📊 **Tableau de bord complet** avec statistiques et revenus
- 📅 **Gestion des disponibilités** et créneaux personnalisables
- 📷 **Upload d'images** de l'atelier et des services
- 💼 **Gestion des services** avec tarifs et descriptions
- 📧 **Notifications** de nouvelles réservations

### 🛡️ Sécurité & Administration
- 🔐 **Authentification JWT** sécurisée
- 👤 **Gestion des rôles** (client/professionnel)
- 🛡️ **Validation des données** côté frontend et backend
- 📊 **Monitoring** avec health checks automatiques

## 🏗️ Architecture Technique

```
BookAuto/
├── 🐳 Docker Configuration
│   ├── docker-compose.yml         # Configuration production
│   ├── docker-compose.dev.yml     # Configuration développement
│   └── start.sh                   # Script de démarrage rapide
│
├── 🖥️ Frontend (React + JavaScript)
│   ├── src/
│   │   ├── components/            # Composants réutilisables
│   │   ├── pages/                 # Pages de l'application
│   │   ├── contexts/              # Contextes React (Auth, etc.)
│   │   └── styles/                # Styles CSS et Tailwind
│   ├── Dockerfile                 # Image production (Nginx)
│   └── Dockerfile.dev             # Image développement
│
├── 🔧 Backend (Node.js + Express)
│   ├── controllers/               # Logique métier
│   ├── models/                    # Modèles MongoDB
│   ├── routes/                    # Définition des API
│   ├── middleware/                # Middlewares (auth, upload, etc.)
│   └── Dockerfile                 # Image Node.js
│
└── 🗄️ Database & Scripts
    ├── scripts/mongo-init.js      # Initialisation MongoDB
    └── README-Docker.md           # Documentation Docker complète
```

## 🛠️ Stack Technique

### Frontend
- **React 18** - Interface utilisateur moderne
- **JavaScript ES6+** - Pas de TypeScript, 100% JS natif
- **Tailwind CSS** - Framework CSS utilitaire
- **Vite** - Build tool ultra-rapide
- **React Router** - Navigation SPA
- **Lucide React** - Icônes modernes

### Backend
- **Node.js 18+** - Runtime JavaScript
- **Express.js** - Framework web minimal
- **MongoDB 7** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **JWT** - Authentification stateless
- **Multer** - Upload de fichiers
- **Bcrypt** - Hachage des mots de passe

### DevOps & Deployment
- **Docker & Docker Compose** - Containerisation complète
- **Nginx** - Serveur web pour la production
- **Health Checks** - Monitoring automatique
- **Multi-stage builds** - Optimisation des images

## 🎯 Services Disponibles

| Service | Description | Professionnels |
|---------|-------------|----------------|
| 🚗 **Automobile** | Mécanique, carrosserie, entretien | 120+ |
| 🔧 **Plomberie** | Dépannage, installation, rénovation | 89+ |
| 🗝️ **Serrurerie** | Ouverture, installation, sécurité | 65+ |
| ⚡ **Électricité** | Installation, dépannage électrique | 78+ |

## 📱 Captures d'écran

<details>
<summary>🖼️ Voir les captures d'écran</summary>

### Page d'accueil
![Accueil](https://via.placeholder.com/600x400/3B82F6/FFFFFF?text=Page+Accueil)

### Tableau de bord professionnel
![Dashboard](https://via.placeholder.com/600x400/10B981/FFFFFF?text=Dashboard+Pro)

### Upload d'images
![Upload](https://via.placeholder.com/600x400/F59E0B/FFFFFF?text=Upload+Images)

</details>

## 🚀 Modes de Déploiement

### 1. Développement (recommandé)
```bash
# Avec hot-reload et sources montées
./start.sh dev
# OU
docker-compose -f docker-compose.dev.yml up --build
```

### 2. Production
```bash
# Build optimisé avec Nginx
./start.sh prod
# OU
docker-compose --profile production up --build
```

### 3. Avec Cache Redis
```bash
# Ajoute Redis pour les performances
docker-compose --profile cache up --build
```

## 🔧 Configuration

### Variables d'environnement essentielles

**Backend (.env)**
```bash
PORT=5000
MONGO_URI=mongodb://mongodb:27017/platformreserv
JWT_SECRET=your-super-secret-key-change-in-production
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env)**
```bash
VITE_API_URL=http://localhost:5000
VITE_APP_TITLE=BookAuto
```

## 📖 Documentation

- 📚 **[Guide Docker Complet](README-Docker.md)** - Installation et déploiement
- 🔧 **[API Documentation](backend/README.md)** - Endpoints et modèles
- 🎨 **[Guide Frontend](frontend/README.md)** - Composants et structure
- 🐛 **[Troubleshooting](README-Docker.md#-résolution-de-problèmes)** - Solutions aux problèmes courants

## 🛡️ Sécurité

### Fonctionnalités implémentées
- ✅ Authentification JWT avec refresh tokens
- ✅ Hachage des mots de passe avec bcrypt
- ✅ Validation des données avec express-validator
- ✅ Rate limiting pour prévenir les attaques
- ✅ Headers de sécurité avec Helmet
- ✅ CORS configuré correctement
- ✅ Upload de fichiers sécurisé avec validation

### Pour la production
1. **Changez tous les secrets** dans les fichiers `.env`
2. **Activez HTTPS** avec des certificats SSL
3. **Configurez un firewall** pour limiter les accès
4. **Activez les logs** pour le monitoring
5. **Mettez à jour régulièrement** les dépendances

## 🧪 Tests et Qualité

```bash
# Tests backend
cd backend && npm test

# Validation de la configuration Docker
./validate-docker.sh

# Health check de l'API
curl http://localhost:5000/health
```

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche : `git checkout -b feature/nouvelle-fonctionnalite`
3. Committez : `git commit -m 'Ajout nouvelle fonctionnalité'`
4. Push : `git push origin feature/nouvelle-fonctionnalite`
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

- 📧 **Email** : support@bookauto.fr
- 💬 **Issues** : [GitHub Issues](../../issues)
- 📖 **Documentation** : [README-Docker.md](README-Docker.md)

## 🎉 Changelog

### v2.0.0 - Refonte Docker complète
- ✨ **Dockerisation complète** de l'application
- 🔄 **Migration TypeScript → JavaScript** pour simplifier
- 📷 **Upload d'images** pour les professionnels
- 🎨 **Interface modernisée** avec Tailwind CSS
- 🔧 **Amélioration des performances** et monitoring

### v1.0.0 - Version initiale
- 🚀 Version MVP avec fonctionnalités de base

---

**🚗 Développé avec ❤️ par l'équipe BookAuto**

*Simplifiez vos rendez-vous automobiles dès aujourd'hui !*
