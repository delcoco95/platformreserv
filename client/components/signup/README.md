# 🧱 Composants d'Inscription

Cette architecture modulaire divise le formulaire d'inscription en 6 composants réutilisables et 2 hooks personnalisés.

## 📁 Structure

```
client/components/signup/
├── SignupAccountTypeSelector.tsx  # ✅ Sélecteur Client/Professionnel
├── ClientFields.tsx               # 👤 Champs spécifiques clients
├── ProfessionalFields.tsx         # 🏢 Champs spécifiques professionnels
├── CommonFields.tsx               # 📞 Champs partagés (email, password, etc.)
├── SignupHeader.tsx               # 🎯 En-tête avec logo et titre
├── SignupFooter.tsx               # 🔗 Liens de navigation
├── SignupForm.tsx                 # �� Formulaire principal
├── types.ts                       # 🏷️ Types TypeScript partagés
├── index.ts                       # 📦 Exports centralisés
└── README.md                      # 📖 Documentation
```

## 🔧 Hooks Personnalisés

```
client/hooks/
├── useSignupValidation.ts         # ✅ Validation du formulaire
└── useSignupRedirection.ts        # 🔄 Redirection automatique
```

## 🎯 Composant Principal

Le composant `Signup.tsx` est maintenant réduit à **120 lignes** (contre 270+ initialement) :

- **État local** : Gestion des données du formulaire
- **Logique métier** : Déléguée aux hooks personnalisés
- **Interface** : Assemblage des composants modulaires

## 📋 Props des Composants

### SignupAccountTypeSelector

```tsx
interface Props {
  accountType: string;
  onChange: (value: "client" | "professionnel") => void;
}
```

### ClientFields / ProfessionalFields

```tsx
interface Props {
  formData: FormDataType;
  onChange: (field: string, value: string) => void;
  disabled: boolean;
}
```

### CommonFields

```tsx
interface Props {
  formData: FormDataType;
  onChange: (field: string, value: string) => void;
  disabled: boolean;
  showPassword?: boolean;
  setShowPassword?: (show: boolean) => void;
  showConfirmPassword?: boolean;
  setShowConfirmPassword?: (show: boolean) => void;
}
```

## ✨ Avantages

- **🔧 Réutilisabilité** : Chaque composant peut être utilisé indépendamment
- **🧪 Testabilité** : Tests unitaires simplifiés par composant
- **🎨 Maintenabilité** : Modifications isolées sans impact global
- **📱 Responsabilité unique** : Chaque composant a une fonction claire
- **🚀 Performance** : Rendu optimisé avec moins de re-renders
- **🎯 Lisibilité** : Code plus facile à comprendre et modifier

## 🔄 Flux de Données

```
Signup.tsx
    ↓ (props)
SignupForm.tsx
    ↓ (conditionally renders)
├── SignupAccountTypeSelector.tsx
├── ClientFields.tsx (if client)
├── ProfessionalFields.tsx (if professional)
└── CommonFields.tsx
```

## 🎨 Styling

- **Design cohérent** : Chaque type de compte a sa couleur (client=bleu, pro=vert)
- **Accessibilité** : Labels appropriés, focus visible, screen readers
- **Responsive** : Grilles adaptatives selon la taille d'écran
