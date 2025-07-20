# Configuration Firebase - Guide de dépannage

## Erreur "Missing or insufficient permissions"

Cette erreur indique que les règles de sécurité Firestore bloquent l'accès aux données. Voici comment la résoudre :

### 1. Configurer les règles Firestore

1. Allez sur la [Console Firebase](https://console.firebase.google.com/)
2. Sélectionnez votre projet
3. Dans le menu de gauche, cliquez sur **Firestore Database**
4. Cliquez sur l'onglet **Règles**
5. Remplacez les règles par le contenu du fichier `firestore.rules.example`

### 2. Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec vos vraies clés Firebase :

```env
VITE_FIREBASE_API_KEY=votre_api_key
VITE_FIREBASE_AUTH_DOMAIN=votre_projet.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=votre_projet_id
VITE_FIREBASE_STORAGE_BUCKET=votre_projet.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=votre_sender_id
VITE_FIREBASE_APP_ID=votre_app_id
```

### 3. Mode démo intégré

Si vous n'avez pas encore configuré Firebase, l'application fonctionne automatiquement en mode démo avec des données d'exemple.

### 4. Activer l'authentification

1. Dans la Console Firebase, allez dans **Authentication**
2. Cliquez sur **Commencer**
3. Dans l'onglet **Sign-in method**, activez **Email/Password**

### 5. Créer les collections Firestore

Les collections suivantes seront créées automatiquement lors de la première utilisation :

- `users` : Profils des utilisateurs (clients et professionnels)
- `appointments` : Rendez-vous
- `reviews` : Avis et évaluations

### 6. Règles de sécurité expliquées

- **users** : Chaque utilisateur peut modifier son propre profil, et tous peuvent voir les profils des professionnels
- **appointments** : Seuls les clients et professionnels concernés peuvent accéder aux rendez-vous
- **reviews** : Tous peuvent lire les avis, seuls les clients peuvent en créer

### 7. Test en mode démo

L'application affiche automatiquement des données d'exemple si :

- L'utilisateur n'est pas connecté
- Firebase n'est pas configuré
- Il y a des erreurs de permissions

Cela permet de tester l'interface sans configuration Firebase complète.
