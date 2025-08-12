# 🚀 RendezVousPro - Plateforme de Réservation Professionnelle

<div align="center">

![RendezVousPro Logo](https://via.placeholder.com/300x100/3B82F6/FFFFFF?text=RendezVousPro)

**La plateforme moderne qui connecte clients et professionnels**

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/username/rendezvous-pro)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)

[✨ Démo Live](#) • [📖 Documentation](#) • [🐛 Signaler un Bug](#) • [💡 Demander une Fonctionnalité](#)

</div>

---

## 📋 Table des Matières

- [✨ Aperçu](#-aperçu)
- [🎯 Fonctionnalités](#-fonctionnalités)
- [🛠 Technologies](#-technologies)
- [🚀 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [🏃‍♂️ Utilisation](#️-utilisation)
- [🐳 Docker](#-docker)
- [📁 Structure du Projet](#-structure-du-projet)
- [🎨 Interface Utilisateur](#-interface-utilisateur)
- [🔧 API Documentation](#-api-documentation)
- [🧪 Tests](#-tests)
- [🚀 Déploiement](#-déploiement)
- [🤝 Contribution](#-contribution)
- [📄 Licence](#-licence)

---

## ✨ Aperçu

RendezVousPro est une plateforme moderne et intuitive qui révolutionne la prise de rendez-vous entre particuliers et professionnels. Inspirée de Planity, elle offre une expérience utilisateur fluide et des fonctionnalités avancées de gestion.

### 🎯 Objectifs

- **Simplifier** la recherche et la réservation de services
- **Sécuriser** les transactions avec un système de paiement intégré
- **Optimiser** la gestion d'agenda pour les professionnels
- **Améliorer** la communication client-professionnel

---

## 🎯 Fonctionnalités

### 👤 **Pour les Clients**
- 🔍 **Recherche avancée** de professionnels par localisation et service
- 📅 **Réservation en ligne** avec sélection de créneaux
- 💳 **Paiement sécurisé** avec acompte (25% du prix total)
- 📱 **Tableau de bord** pour gérer ses rendez-vous
- ⭐ **Système d'avis** et de notation
- 💬 **Messagerie** intégrée avec les professionnels
- 🔔 **Notifications** en temps réel

### 👨‍💼 **Pour les Professionnels**
- 🏢 **Profil professionnel** complet avec logo d'entreprise
- 🛠 **Gestion des services** (prix, durée, description)
- 📊 **Tableau de bord** avec statistiques avancées
- 💰 **Suivi du chiffre d'affaires** en temps réel
- ✅ **Validation/Refus** des demandes de rendez-vous
- 📅 **Gestion de l'agenda** et des disponibilités
- 📈 **Rapports** de performance détaillés

### 🌐 **Fonctionnalités Générales**
- 🎨 **Interface moderne** et responsive (mobile-first)
- 🔐 **Authentification sécurisée** avec JWT
- 💾 **Base de données** MongoDB robuste
- 🚀 **Performance optimisée** avec cache intelligent
- 🌍 **Multilingue** (français par défaut)
- 📧 **Notifications email** automatiques

---

## 🛠 Technologies

### **Frontend**
- ⚛️ **React 18** - Interface utilisateur moderne
- 🎨 **Tailwind CSS** - Design system et styling
- 🚦 **React Router** - Navigation SPA
- 📡 **Axios** - Client HTTP
- 🎯 **React Hook Form** - Gestion des formulaires
- 🔥 **React Hot Toast** - Notifications

### **Backend**
- 🟢 **Node.js** - Runtime JavaScript
- 🚀 **Express.js** - Framework web
- 🍃 **MongoDB** - Base de données NoSQL
- 🔒 **JWT** - Authentification
- 💳 **Stripe** - Paiements sécurisés
- 📧 **Nodemailer** - Envoi d'emails
- 🛡️ **Helmet** - Sécurité HTTP

### **DevOps & Outils**
- ⚡ **Vite** - Build tool ultra-rapide
- 🐳 **Docker** - Conteneurisation
- 📝 **ESLint** - Linting JavaScript
- 🎨 **Prettier** - Formatage de code
- 🔧 **Nodemon** - Rechargement automatique

---

## 🚀 Installation

### Prérequis

Assurez-vous d'avoir installé :

- **Node.js** ≥ 18.0.0
- **npm** ≥ 8.0.0
- **MongoDB** ≥ 5.0 (local ou cloud)
- **Git**

### 🔧 Installation Rapide

```bash
# 1. Cloner le repository
git clone https://github.com/username/rendezvous-pro.git
cd rendezvous-pro

# 2. Installer les dépendances
npm run setup

# 3. Configurer les variables d'environnement
cp backend/.env.example backend/.env

# 4. Démarrer en mode développement
npm run dev
```

### 📦 Installation Détaillée

```bash
# Installation des dépendances root
npm install

# Installation Frontend
cd frontend
npm install

# Installation Backend
cd ../backend
npm install

# Retour à la racine
cd ..
```

---

## ⚙️ Configuration

### 🔐 Variables d'Environnement

Créez un fichier `backend/.env` avec les variables suivantes :

```env
# Configuration serveur
PORT=5000
NODE_ENV=development

# Base de données MongoDB
MONGO_URI=mongodb://localhost:27017/rendezvous-pro

# JWT Secret (générez une clé sécurisée)
JWT_SECRET=votre-super-secret-jwt-key-changez-en-production

# Stripe (optionnel pour les paiements)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Email (optionnel)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre-email@gmail.com
EMAIL_PASS=votre-mot-de-passe

# URLs
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000
```

### 🗄️ Configuration MongoDB

#### Option 1: MongoDB Local
```bash
# Installer MongoDB Community Edition
# https://docs.mongodb.com/manual/installation/

# Démarrer MongoDB
mongod

# Créer la base de données
mongosh
> use rendezvous-pro
```

#### Option 2: MongoDB Atlas (Cloud)
1. Créez un compte sur [MongoDB Atlas](https://cloud.mongodb.com)
2. Créez un cluster gratuit
3. Obtenez l'URI de connexion
4. Mettez à jour `MONGO_URI` dans `.env`

---

## 🏃‍♂️ Utilisation

### 🖥️ Mode Développement

```bash
# Terminal 1 - Démarrer le backend
cd backend
npm run dev

# Terminal 2 - Démarrer le frontend
cd frontend
npm run dev
```

**Accès :**
- 🌐 **Frontend** : http://localhost:3000
- 🔗 **Backend API** : http://localhost:5000
- 📊 **API Health** : http://localhost:5000/health

### 🚀 Mode Production

```bash
# Build du frontend
cd frontend
npm run build

# Démarrer le backend en production
cd ../backend
npm start
```

### 📱 Comptes de Test

Pour tester rapidement l'application :

**Client Test:**
```
Email: client@test.com
Mot de passe: 123456
```

**Professionnel Test:**
```
Email: pro@test.com
Mot de passe: 123456
```

---

## 🐳 Docker

### 🚀 Démarrage Rapide avec Docker

```bash
# Construire et démarrer tous les services
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter tous les services
docker-compose down
```

### 📋 Services Docker

Le `docker-compose.yml` inclut :

- **MongoDB** : Base de données (port 27017)
- **Backend** : API Node.js (port 5000)
- **Frontend** : Application React (port 3000)

---

## 📁 Structure du Projet

```
rendezvous-pro/
├── 📄 README.md
├── 📄 docker-compose.yml
├── 📄 package.json
│
├── 🎨 frontend/                    # Application React
│   ├── 📄 package.json
│   ├── 📄 vite.config.js
│   ├── 📄 tailwind.config.js
│   ├── 🌐 public/
│   └── 📁 src/
│       ├── 📄 App.jsx              # Composant principal
│       ├── 📄 main.jsx             # Point d'entrée
│       ├── 🎨 styles/              # Styles CSS
│       ├── 📄 components/          # Composants réutilisables
│       │   ├── 🏠 Header.jsx
│       │   ├── 🏠 Footer.jsx
│       │   ├── 🔐 ProtectedRoute.jsx
│       │   └── 📊 dashboard/
│       ├── 📄 pages/               # Pages de l'application
│       │   ├── 🏠 HomePage.jsx
│       │   ├── 🔐 LoginPage.jsx
│       │   ├── 📝 RegisterPage.jsx
│       │   └── 📊 DashboardPage.jsx
│       ├── 🎯 contexts/            # Contextes React
│       │   └── 🔐 AuthContext.jsx
│       ├── 🔧 hooks/               # Hooks personnalisés
│       ├── 📡 services/            # Services API
│       │   └── 📡 api.js
│       └── 🛠 utils/               # Utilitaires
│
├── 🔧 backend/                     # API Node.js
│   ├── 📄 package.json
│   ├── 📄 server.js                # Serveur principal
│   ├── 🗄️ models/                 # Modèles MongoDB
│   │   ├── 👤 User.js
│   │   ├── 🛠 Service.js
│   │   ├── 📅 Booking.js
│   │   ├── ⭐ Review.js
│   │   ├── 💬 Conversation.js
│   │   └── 💳 Transaction.js
│   ├── 🎯 controllers/             # Logique métier
│   │   ├── 🔐 authController.js
│   │   ├── 👤 userController.js
│   │   ├── 🛠 serviceController.js
│   │   └── 📅 bookingController.js
│   ├── 🛣️ routes/                  # Routes API
│   │   ├── 🔐 authRoutes.js
│   │   ├── 👤 userRoutes.js
│   │   ├── 🛠 serviceRoutes.js
│   │   └── 📅 bookingRoutes.js
│   ├── 🛡️ middleware/              # Middlewares
│   │   └── 🔐 auth.js
│   └── ⚙️ config/                  # Configuration
│       └── 🗄️ db.js
│
└── 📚 docs/                        # Documentation
    ├── 📖 API.md
    ├── 🎨 UI-GUIDE.md
    └── 🚀 DEPLOYMENT.md
```

---

## 🎨 Interface Utilisateur

### 🏠 Page d'Accueil
- **Hero Section** avec recherche intuitive
- **Services populaires** avec icônes attrayantes
- **Comment ça marche** en 3 étapes simples
- **Avantages** de la plateforme
- **Call-to-action** pour professionnels

### 📊 Dashboards

#### 👤 Dashboard Client
- 📈 **Statistiques** de réservations
- 📅 **Rendez-vous** à venir et passés
- ⭐ **Avis** à laisser
- 💬 **Messages** avec professionnels

#### 👨‍💼 Dashboard Professionnel
- 💰 **Chiffre d'affaires** en temps réel
- 📊 **Statistiques** détaillées
- 📅 **Gestion** des réservations
- 🛠 **Configuration** des services

### 📱 Responsive Design
- 🖥️ **Desktop** - Expérience complète
- 📱 **Mobile** - Interface optimisée
- 💾 **Performance** - Chargement rapide

---

## 🔧 API Documentation

### 🔐 Authentification

```javascript
// Inscription
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "userType": "client", // ou "professionnel"
  "firstName": "Jean",
  "lastName": "Dupont"
}

// Connexion
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

// Profil utilisateur
GET /api/auth/me
Headers: { "Authorization": "Bearer JWT_TOKEN" }
```

### 🛠 Services

```javascript
// Récupérer les services
GET /api/services?category=automobile&city=Paris

// Créer un service (professionnel)
POST /api/services
{
  "name": "Révision complète",
  "description": "Révision 15000km",
  "category": "automobile",
  "price": 150,
  "duration": 120
}
```

### 📅 Réservations

```javascript
// Créer une réservation
POST /api/bookings
{
  "serviceId": "service_id",
  "professionalId": "professional_id",
  "appointmentDate": "2024-01-15T14:00:00Z",
  "duration": 60
}

// Récupérer mes réservations
GET /api/bookings
```

---

## 🧪 Tests

### 🚀 Tests Frontend

```bash
cd frontend
npm test                 # Tests unitaires
npm run test:coverage    # Tests avec couverture
npm run test:e2e         # Tests end-to-end
```

### 🔧 Tests Backend

```bash
cd backend
npm test                 # Tests API
npm run test:integration # Tests d'intégration
```

### 📊 Couverture de Tests

- ✅ **Frontend** : >80% de couverture
- ✅ **Backend** : >85% de couverture
- ✅ **E2E** : Scénarios critiques couverts

---

## 🚀 Déploiement

### 🌐 Déploiement Frontend (Netlify/Vercel)

```bash
# Build de production
cd frontend
npm run build

# Déployer sur Netlify
npm run deploy:netlify

# Ou sur Vercel
npm run deploy:vercel
```

### 🔧 Déploiement Backend (Heroku/Railway)

```bash
# Variables d'environnement à configurer
NODE_ENV=production
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-production-secret
FRONTEND_URL=https://your-frontend-domain.com
```

### 🐳 Déploiement Docker

```bash
# Production avec Docker
docker-compose -f docker-compose.prod.yml up -d
```

---

## 🤝 Contribution

Nous accueillons les contributions ! Voici comment participer :

### 🔄 Processus de Contribution

1. **Fork** le projet
2. **Créez** une branche feature (`git checkout -b feature/AmazingFeature`)
3. **Commitez** vos changements (`git commit -m 'Add AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrez** une Pull Request

### 📋 Guidelines

- ✅ Respectez les conventions de code (ESLint + Prettier)
- ✅ Ajoutez des tests pour les nouvelles fonctionnalités
- ✅ Mettez à jour la documentation si nécessaire
- ✅ Testez sur différents navigateurs

### 🐛 Signaler des Bugs

Utilisez les [GitHub Issues](https://github.com/username/rendezvous-pro/issues) avec le template approprié.

---

## 📞 Support et Contact

- 📧 **Email** : contact@rendezvous-pro.fr
- 💬 **Discord** : [Communauté RendezVousPro](#)
- 📖 **Documentation** : [docs.rendezvous-pro.fr](#)
- 🐛 **Issues** : [GitHub Issues](#)

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🙏 Remerciements

- 🎨 **Inspiration** : Planity pour l'UX/UI
- 🛠 **Technologies** : Équipes React, Node.js, MongoDB
- 🌟 **Communauté** : Contributeurs et utilisateurs
- 📚 **Ressources** : Documentation et tutoriels open-source

---

<div align="center">

**⭐ Si ce projet vous plaît, n'hésitez pas à lui donner une étoile ! ⭐**

![Merci](https://via.placeholder.com/500x200/3B82F6/FFFFFF?text=Merci+pour+votre+soutien!)

---

*Développé avec ❤️ par l'équipe RendezVousPro*

[🔝 Retour en haut](#-rendezvous-pro---plateforme-de-réservation-professionnelle)

</div>
