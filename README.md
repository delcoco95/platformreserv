# 🚗 BookAuto - Plateforme de Réservation Automobile

Une plateforme simple et efficace pour réserver des services automobiles avec des professionnels qualifiés.

## 🏗️ Architecture

```
BookAuto/
├── backend/           # API Node.js + Express
├── frontend/          # Interface React
├── scripts/           # Scripts d'initialisation MongoDB
├── docker-compose.yml # Configuration MongoDB
└── package.json       # Scripts principaux
```

## 🚀 Démarrage rapide

### 1. Installation

```bash
# Cloner le repository
git clone <votre-repo>
cd bookauto

# Installer toutes les dépendances
npm run install:all
```

### 2. Configuration

```bash
# Copier les fichiers d'environnement
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

### 3. Lancement

```bash
# Démarrer tout en mode développement
npm run dev

# OU démarrer les services séparément :
npm run dev:db        # MongoDB uniquement
npm run dev:backend   # API backend
npm run dev:frontend  # Interface React
```

## 🌐 Accès à l'application

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:5000
- **MongoDB** : localhost:27017

## 📁 Structure détaillée

### Backend (Node.js + Express)
```
backend/
├── models/           # Modèles MongoDB (User, Service, Booking)
├── routes/           # Routes API (auth, users, services, bookings)
├── middleware/       # Middleware d'authentification
├── server.js         # Serveur principal
└── .env             # Configuration
```

### Frontend (React + Vite)
```
frontend/
├── src/
│   ├── components/   # Composants réutilisables
│   ├── pages/        # Pages de l'application
│   ├── contexts/     # Contexte d'authentification
│   ├── services/     # Services API
│   └── App.jsx       # Composant principal
├── index.html        # Point d'entrée
└── .env             # Configuration
```

## 🔧 Scripts disponibles

### Scripts principaux
```bash
npm run dev          # Démarrer tout (DB + Backend + Frontend)
npm run setup        # Installation complète + démarrage DB
npm run clean        # Nettoyer la base de données
```

### Scripts backend
```bash
cd backend
npm start           # Démarrer en production
npm run dev         # Démarrer avec nodemon
```

### Scripts frontend
```bash
cd frontend
npm run dev         # Serveur de développement
npm run build       # Build de production
npm run preview     # Prévisualiser le build
```

## 🗄️ Base de données

### MongoDB avec Docker
- **Image** : mongo:7-jammy
- **Port** : 27017
- **Base** : bookauto
- **Volume persistant** : mongodb_data

### Comptes de test
- **Client** : client@test.com / 123456
- **Professionnel** : pro@test.com / 123456

## 🛠️ Technologies utilisées

### Backend
- **Node.js 18+** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM MongoDB
- **JWT** - Authentification
- **bcryptjs** - Hachage des mots de passe

### Frontend
- **React 18** - Interface utilisateur
- **Vite** - Build tool rapide
- **React Router** - Navigation
- **Tailwind CSS** - Styles
- **Axios** - Requêtes HTTP
- **Lucide React** - Icônes

## 🔐 Variables d'environnement

### Backend (.env)
```bash
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/bookauto
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:5000
```

## 📡 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

### Utilisateurs
- `GET /api/users/profile` - Profil utilisateur
- `PUT /api/users/profile` - Modifier le profil
- `GET /api/users/professionals` - Liste des professionnels

### Services
- `GET /api/services` - Liste des services
- `POST /api/services` - Créer un service (pro)
- `GET /api/services/:id` - Détails d'un service

### Réservations
- `POST /api/bookings` - Créer une réservation
- `GET /api/bookings/my-bookings` - Mes réservations
- `PUT /api/bookings/:id/status` - Modifier le statut (pro)

## 🎯 Fonctionnalités

### Pour les clients
- ✅ Inscription et connexion
- ✅ Recherche de professionnels
- ✅ Réservation de services
- ✅ Gestion des rendez-vous

### Pour les professionnels
- ✅ Profil d'entreprise
- ✅ Gestion des services
- ✅ Réception des réservations
- ✅ Tableau de bord

## 🚨 Résolution de problèmes

### MongoDB ne démarre pas
```bash
# Vérifier que Docker est démarré
docker --version

# Redémarrer MongoDB
npm run clean
npm run dev:db
```

### Erreur de port occupé
```bash
# Tuer les processus sur les ports
kill -9 $(lsof -ti:3000)  # Frontend
kill -9 $(lsof -ti:5000)  # Backend
kill -9 $(lsof -ti:27017) # MongoDB
```

### Erreur de dépendances
```bash
# Réinstaller toutes les dépendances
rm -rf node_modules backend/node_modules frontend/node_modules
npm run install:all
```

## 📞 Support

- 📧 Email : support@bookauto.fr
- 🐛 Issues : [GitHub Issues](../../issues)

## 📄 Licence

MIT License - voir le fichier LICENSE pour plus de détails.

---

**🚗 Développé avec ❤️ pour simplifier vos réservations automobiles**
