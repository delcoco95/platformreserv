# 🐳 BookAuto - Configuration Docker

Guide complet pour déployer BookAuto avec Docker. Clonez, configurez et lancez en quelques minutes !

## 🚀 Démarrage rapide

```bash
# 1. Cloner le repository
git clone <votre-repo-url>
cd bookauto

# 2. Copier les fichiers de configuration
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 3. Lancer l'application complète
docker-compose up --build
```

L'application sera accessible sur :
- Frontend : http://localhost:3000
- Backend API : http://localhost:5000
- MongoDB : localhost:27017

## 📋 Prérequis

- Docker >= 20.0
- Docker Compose >= 2.0
- Git

## 🏗️ Architecture

```
BookAuto/
├── docker-compose.yml          # Configuration principale
├── docker-compose.dev.yml     # Configuration développement
├── .env                        # Variables globales
├── backend/
│   ├── Dockerfile             # Image backend
│   ├── .env                   # Config backend
│   └── ...
├── frontend/
│   ├── Dockerfile             # Image frontend production
│   ├── Dockerfile.dev         # Image frontend développement
│   ├── .env                   # Config frontend
│   └── ...
└── scripts/
    └── mongo-init.js          # Initialisation MongoDB
```

## 🛠️ Configuration

### Variables d'environnement

#### Backend (.env)
```bash
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://mongodb:27017/platformreserv
JWT_SECRET=bookauto-jwt-secret-change-in-production-2024
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env)
```bash
VITE_API_URL=http://localhost:5000
VITE_APP_TITLE=BookAuto
```

### Modes de déploiement

#### 1. Développement (recommandé)
```bash
# Utilise les sources locales avec hot-reload
docker-compose -f docker-compose.dev.yml up --build
```

#### 2. Production
```bash
# Build et déploie en mode production
docker-compose --profile production up --build
```

#### 3. Avec cache Redis (optionnel)
```bash
# Ajoute Redis pour le cache
docker-compose --profile cache up --build
```

## 📦 Services disponibles

| Service | Port | Description |
|---------|------|-------------|
| mongodb | 27017 | Base de données MongoDB |
| backend | 5000 | API Node.js/Express |
| frontend-dev | 3000 | Frontend React (dev) |
| frontend-prod | 8080 | Frontend React (prod) |
| redis | 6379 | Cache Redis (optionnel) |
| nginx-proxy | 80/443 | Proxy Nginx (optionnel) |

## 🔧 Commandes utiles

### Gestion des conteneurs
```bash
# Démarrer tous les services
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Redémarrer un service
docker-compose restart backend

# Arrêter tous les services
docker-compose down

# Supprimer les volumes (⚠️ perte de données)
docker-compose down -v
```

### Debugging
```bash
# Accéder au conteneur backend
docker-compose exec backend sh

# Voir les logs MongoDB
docker-compose logs mongodb

# Construire sans cache
docker-compose build --no-cache
```

### Base de données
```bash
# Connexion à MongoDB
docker-compose exec mongodb mongosh platformreserv

# Backup de la base
docker-compose exec mongodb mongodump --db=platformreserv

# Réinitialiser la base
docker-compose restart mongodb
```

## 🗂️ Volumes persistants

Les données importantes sont sauvegardées dans des volumes Docker :

- `bookauto-mongodb` : Données MongoDB
- `bookauto-uploads` : Fichiers uploadés (images professionnels)
- `bookauto-redis` : Cache Redis (si activé)

## 🔒 Sécurité

### Pour la production

1. **Changez les secrets** :
```bash
# Générer un JWT secret sécurisé
openssl rand -base64 32
```

2. **Utilisez HTTPS** :
   - Configurez les certificats SSL dans `nginx/ssl/`
   - Activez le profil `production`

3. **Limitez les accès** :
   - Modifiez les ports exposés
   - Configurez un firewall

## 🚨 Résolution de problèmes

### Port déjà utilisé
```bash
# Vérifier les ports occupés
netstat -tlnp | grep :3000

# Changer les ports dans docker-compose.yml
ports:
  - "3001:3000"  # Nouveau port local
```

### Problèmes de permissions
```bash
# Fixer les permissions
sudo chown -R $USER:$USER .
```

### Base de données non accessible
```bash
# Vérifier la santé des services
docker-compose ps

# Redémarrer MongoDB
docker-compose restart mongodb

# Voir les logs détaillés
docker-compose logs mongodb
```

### Frontend ne se connecte pas au backend
1. Vérifiez `VITE_API_URL` dans `frontend/.env`
2. Assurez-vous que le backend est démarré
3. Vérifiez les logs : `docker-compose logs backend`

## 📈 Monitoring

### Vérification de santé
```bash
# API Backend
curl http://localhost:5000/health

# Frontend
curl http://localhost:3000

# MongoDB
docker-compose exec mongodb mongosh --eval "db.runCommand('ping')"
```

### Métriques
Les conteneurs incluent des health checks automatiques visibles avec :
```bash
docker-compose ps
```

## 🔄 Mise à jour

```bash
# 1. Sauvegarder les données
docker-compose exec mongodb mongodump

# 2. Arrêter les services
docker-compose down

# 3. Mettre à jour le code
git pull

# 4. Reconstruire et relancer
docker-compose up --build
```

## 📞 Support

En cas de problème :

1. Consultez les logs : `docker-compose logs`
2. Vérifiez la configuration : `.env` et `docker-compose.yml`
3. Redémarrez les services : `docker-compose restart`
4. Nettoyage complet : `docker-compose down -v && docker-compose up --build`

## 🎯 Checklist de déploiement

- [ ] Docker et Docker Compose installés
- [ ] Repository cloné
- [ ] Fichiers `.env` configurés
- [ ] Ports 3000, 5000, 27017 disponibles
- [ ] `docker-compose up` sans erreur
- [ ] Frontend accessible sur http://localhost:3000
- [ ] API accessible sur http://localhost:5000/health
- [ ] MongoDB connecté (voir logs backend)

---

**🎉 Votre application BookAuto est maintenant prête !**

Accédez à http://localhost:3000 pour commencer à utiliser la plateforme.
