# RendezVousPro - Plateforme de Réservation

Une plateforme moderne et simple pour prendre rendez-vous avec des professionnels.

## ✨ Fonctionnalités

- 🔐 **Authentification** - Connexion/inscription pour clients et professionnels
- 📅 **Réservation** - Prise de rendez-vous en ligne
- 👥 **Gestion des profils** - Profils clients et professionnels
- 🏢 **Services** - Gestion des services proposés par les professionnels
- 📱 **Responsive** - Interface adaptée mobile et desktop

## 🛠 Technologies

- **Frontend**: React 18 + JavaScript (ES6+)
- **Styles**: Tailwind CSS
- **Backend**: Node.js + Express
- **Base de données**: MongoDB
- **Authentification**: JWT
- **Build**: Vite

## 📋 Prérequis

- **Node.js** 18 ou plus récent
- **MongoDB** (local ou Docker)
- **Git**

## 🚀 Installation

### 1. Cloner le projet
```bash
git clone <url-du-projet>
cd rendezvous-pro-platform
```

### 2. Installation des dépendances
```bash
# Dépendances racine
npm install

# Dépendances frontend
cd frontend
npm install

# Dépendances backend
cd ../backend
npm install
```

### 3. Configuration de la base de données

#### Option A: MongoDB local
1. Installer MongoDB sur votre machine
2. Démarrer MongoDB: `mongod`

#### Option B: Docker (recommandé)
```bash
# Retour à la racine du projet
cd ..

# Démarrer MongoDB avec Docker
docker-compose up -d mongodb
```

### 4. Configuration des variables d'environnement

Le fichier `backend/.env` est déjà configuré pour le développement local:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/rendezvous-pro
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

## 🎯 Lancement du projet

### Développement local

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
# ou
npm start
```
Le backend sera accessible sur http://localhost:5000

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
Le frontend sera accessible sur http://localhost:3000

### Avec Docker (complet)
```bash
# À la racine du projet
docker-compose up -d
```

## 📁 Structure du projet

```
rendezvous-pro-platform/
├── README.md
├── package.json                 # Configuration workspace
├── docker-compose.yml          # Configuration Docker
│
├── frontend/                   # Application React
│   ├── src/
│   │   ├── components/         # Composants réutilisables
│   │   ├── pages/             # Pages de l'application
│   │   ├── contexts/          # Contextes React (Auth, etc.)
│   │   ├── hooks/             # Hooks personnalisés
│   │   ├── services/          # Services API
│   │   ├── utils/             # Utilitaires
│   │   ├── styles/            # Styles globaux
│   │   ├── App.jsx            # Composant principal
│   │   └── main.jsx           # Point d'entrée
│   ├── public/                # Fichiers statiques
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── backend/                   # API Node.js
    ├── controllers/           # Logique métier
    ├── models/               # Modèles MongoDB
    ├── routes/               # Routes API
    ├── middleware/           # Middlewares Express
    ├── config/               # Configuration DB
    ├── server.js             # Point d'entrée
    ├── package.json
    └── .env                  # Variables d'environnement
```

## 🔧 Scripts disponibles

### Frontend
```bash
npm run dev        # Démarrage en mode développement
npm run build      # Build de production
npm run preview    # Aperçu du build
```

### Backend
```bash
npm start          # Démarrage en mode production
npm run dev        # Démarrage avec nodemon (auto-reload)
```

### Docker
```bash
npm run docker:dev     # Démarrer avec Docker
npm run docker:down    # Arrêter les conteneurs
npm run docker:build   # Rebuild les images
```

## 🎨 Fonctionnalités implémentées

### Frontend
- ✅ **Pages principales**: Accueil, connexion, inscription, tableau de bord
- ✅ **Authentification**: Contexte React pour gérer l'état d'authentification
- ✅ **Routing**: Navigation avec React Router
- ✅ **Styles**: Design moderne avec Tailwind CSS
- ✅ **Responsive**: Interface adaptative
- ✅ **Components**: Composants réutilisables et modulaires

### Backend
- ✅ **API REST**: Endpoints pour auth, utilisateurs, rendez-vous
- ✅ **Authentification**: JWT avec middleware de protection
- ✅ **Base de données**: Modèles MongoDB avec Mongoose
- ✅ **CORS**: Configuration pour les requêtes cross-origin
- ✅ **Validation**: Validation des données entrantes

## 🧪 Test

1. **Démarrer le backend**: `cd backend && npm start`
2. **Démarrer le frontend**: `cd frontend && npm run dev`
3. **Ouvrir le navigateur**: http://localhost:3000
4. **Tester l'inscription**: Créer un compte client ou professionnel
5. **Tester la connexion**: Se connecter avec les identifiants créés

## 🔍 Dépannage

### Problème de connexion MongoDB
```bash
# Vérifier que MongoDB est démarré
mongosh # ou mongo
```

### Problème de ports
- Frontend: port 3000 (configurable dans vite.config.js)
- Backend: port 5000 (configurable dans .env)
- MongoDB: port 27017

### Problème de dépendances
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

## 📝 Configuration production

1. **Variables d'environnement**: Modifier `.env` avec des valeurs de production
2. **Build frontend**: `npm run build`
3. **Serveur**: Déployer sur un serveur Node.js
4. **Base de données**: Utiliser MongoDB Atlas ou instance dédiée

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/NouvelleFeature`)
3. Commit les changements (`git commit -m 'Ajout nouvelle feature'`)
4. Push vers la branche (`git push origin feature/NouvelleFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour les détails.

## 📧 Support

Pour toute question ou problème:
- Créer une issue sur GitHub
- Contacter l'équipe de développement

---

**RendezVousPro** - Simplifiez vos rendez-vous ! 🚀
