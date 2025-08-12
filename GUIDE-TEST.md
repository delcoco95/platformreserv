# 🧪 Guide de Test - RendezVousPro

## 🚀 Test Rapide de l'Application

### 1. **Démarrage Local**

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

**URLs de test :**
- Frontend : http://localhost:3000
- Backend API : http://localhost:5000
- Health Check : http://localhost:5000/health

### 2. **Comptes de Test Prêts**

Les comptes suivants sont automatiquement créés :

**👤 Client Test :**
```
Email: client@test.com
Mot de passe: 123456
```

**👨‍💼 Professionnel Test :**
```
Email: pro@test.com  
Mot de passe: 123456
```

### 3. **Scénarios de Test**

#### 🏠 **Page d'Accueil**
- ✅ Vérifier le design moderne et responsive
- ✅ Tester la barre de recherche (service, ville, date)
- ✅ Navigation vers pages professionnels/services
- ✅ CTA d'inscription fonctionnel

#### 🔐 **Authentification**
- ✅ Inscription client et professionnel
- ✅ Connexion avec comptes de test
- ✅ Redirection après connexion
- ✅ Déconnexion

#### 👤 **Dashboard Client**
- ✅ Affichage des statistiques
- ✅ Réservations (vide au début)
- ✅ Actions rapides fonctionnelles
- ✅ Interface responsive

#### 👨‍💼 **Dashboard Professionnel**
- ✅ Chiffre d'affaires (€0 au début)
- ✅ Gestion des réservations
- ✅ Mes services (vide au début)
- ✅ Actions de gestion

#### 🔍 **Recherche de Professionnels**
- ✅ Filtres par catégorie et ville
- ✅ Affichage des services
- ✅ Pagination fonctionnelle
- ✅ Boutons de réservation

---

## 🐳 Test avec Docker

### **Démarrage Docker Complet**

```bash
# Démarrer tous les services
docker-compose up -d

# Voir les logs en temps réel
docker-compose logs -f

# Tester les services
curl http://localhost:5000/health
curl http://localhost:3000
```

### **Services Docker :**
- **MongoDB** : Port 27017
- **Backend** : Port 5000  
- **Frontend** : Port 3000

---

## 📊 Tests API (Backend)

### **Health Check**
```bash
curl http://localhost:5000/health
# Réponse attendue : { "status": "OK", "timestamp": "..." }
```

### **Inscription**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456",
    "userType": "client",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### **Connexion**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "client@test.com",
    "password": "123456"
  }'
```

### **Services**
```bash
curl http://localhost:5000/api/services
# Réponse : Liste des services (vide au début)
```

---

## ✅ Checklist de Validation

### **🎨 Frontend**
- [ ] Page d'accueil moderne et responsive
- [ ] Authentification complète (inscription/connexion)
- [ ] Navigation fluide entre pages
- [ ] Dashboards client et professionnel
- [ ] Recherche de professionnels
- [ ] Formulaires fonctionnels
- [ ] Design Tailwind CSS cohérent
- [ ] Messages d'erreur clairs

### **🔧 Backend**
- [ ] Serveur démarre sans erreur
- [ ] Connexion MongoDB réussie
- [ ] Routes d'authentification
- [ ] Middleware de sécurité
- [ ] Validation des données
- [ ] Gestion des erreurs
- [ ] Structure MVC propre

### **🗄️ Base de Données**
- [ ] Connexion MongoDB
- [ ] Modèles Mongoose
- [ ] Index de performance
- [ ] Données de test créées
- [ ] Schémas valides

### **🐳 Docker**
- [ ] Tous les services démarrent
- [ ] Communication inter-services
- [ ] Volumes persistants
- [ ] Variables d'environnement
- [ ] Réseau Docker configuré

---

## 🐛 Dépannage Courant

### **Problèmes Fréquents**

#### **Frontend ne démarre pas**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### **Backend erreur MongoDB**
```bash
# Vérifier MongoDB
mongosh mongodb://localhost:27017/rendezvous-pro

# Ou démarrer avec Docker
docker-compose up mongodb -d
```

#### **CORS Error**
Vérifier dans `backend/server.js` que l'origine frontend est autorisée :
```javascript
origin: ["http://localhost:3000", ...]
```

#### **Port déjà utilisé**
```bash
# Trouver et tuer le processus
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

---

## 📈 Tests de Performance

### **Métriques Frontend**
- ⚡ **First Contentful Paint** < 1.5s
- 📊 **Lighthouse Score** > 90
- 📱 **Mobile Friendly** ✅
- ♿ **Accessibility** > 90

### **Métriques Backend**
- 🚀 **Response Time** < 200ms
- 💾 **Memory Usage** < 512MB
- 🔗 **Concurrent Users** > 100
- ⏱️ **Uptime** > 99%

---

## 🎯 Prochaines Étapes

Après validation des tests de base :

1. **🔧 Fonctionnalités Avancées**
   - Système de réservation complet
   - Paiement Stripe intégré
   - Messagerie temps réel
   - Notifications push

2. **🧪 Tests Additionnels**
   - Tests unitaires frontend/backend
   - Tests d'intégration E2E
   - Tests de charge
   - Tests de sécurité

3. **🚀 Déploiement**
   - CI/CD Pipeline
   - Environnements staging/production
   - Monitoring et logs
   - Sauvegardes automatiques

---

## 📞 Support

En cas de problème pendant les tests :

- 📖 **Documentation** : README.md
- 🐛 **Issues** : GitHub Issues
- 💬 **Contact** : contact@rendezvous-pro.fr

---

**✅ Application testée et validée !** 🎉
