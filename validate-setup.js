#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔍 Validation de la configuration RendezVousPro...\n');

const checks = [];

// Vérifier les fichiers essentiels
const essentialFiles = [
  'package.json',
  'README.md',
  'docker-compose.yml',
  'frontend/package.json',
  'frontend/src/App.jsx',
  'frontend/src/main.jsx',
  'frontend/vite.config.js',
  'frontend/tailwind.config.js',
  'backend/package.json',
  'backend/server.js',
  'backend/.env',
];

console.log('📁 Vérification des fichiers essentiels:');
essentialFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
  checks.push({ type: 'file', name: file, status: exists });
});

// Vérifier la structure des dossiers
const essentialDirs = [
  'frontend/src/components',
  'frontend/src/pages',
  'frontend/src/contexts',
  'frontend/src/utils',
  'backend/controllers',
  'backend/models',
  'backend/routes',
];

console.log('\n📂 Vérification de la structure:');
essentialDirs.forEach(dir => {
  const exists = fs.existsSync(dir);
  console.log(`${exists ? '✅' : '❌'} ${dir}`);
  checks.push({ type: 'dir', name: dir, status: exists });
});

// Vérifier les fichiers JavaScript (pas de TypeScript)
console.log('\n🔄 Vérification de la conversion TypeScript → JavaScript:');
const tsFiles = [
  'frontend/src/App.tsx',
  'frontend/src/main.tsx',
  'frontend/src/contexts/AuthContext.tsx',
  'frontend/src/utils/api.ts',
];

const jsFiles = [
  'frontend/src/App.jsx',
  'frontend/src/main.jsx',
  'frontend/src/contexts/AuthContext.jsx',
  'frontend/src/utils/api.js',
];

tsFiles.forEach((tsFile, index) => {
  const tsExists = fs.existsSync(tsFile);
  const jsExists = fs.existsSync(jsFiles[index]);
  
  if (!tsExists && jsExists) {
    console.log(`✅ ${tsFile} → ${jsFiles[index]} (converti)`);
  } else if (tsExists) {
    console.log(`⚠️  ${tsFile} existe encore (à supprimer)`);
  } else {
    console.log(`❌ ${jsFiles[index]} manquant`);
  }
});

// Résumé
console.log('\n📊 Résumé de la validation:');
const fileChecks = checks.filter(c => c.type === 'file');
const dirChecks = checks.filter(c => c.type === 'dir');
const filesPassed = fileChecks.filter(c => c.status).length;
const dirsPassed = dirChecks.filter(c => c.status).length;

console.log(`📁 Fichiers: ${filesPassed}/${fileChecks.length} ✅`);
console.log(`📂 Dossiers: ${dirsPassed}/${dirChecks.length} ✅`);

const allPassed = fileChecks.every(c => c.status) && dirChecks.every(c => c.status);

if (allPassed) {
  console.log('\n🎉 VALIDATION RÉUSSIE !');
  console.log('✨ Le projet RendezVousPro est configuré correctement.');
  console.log('\n🚀 Prochaines étapes:');
  console.log('1. cd frontend && npm run dev (Frontend sur http://localhost:3000)');
  console.log('2. cd backend && npm start (Backend sur http://localhost:5000)');
  console.log('3. Ouvrir http://localhost:3000 dans votre navigateur');
} else {
  console.log('\n⚠️  VALIDATION INCOMPLÈTE');
  console.log('Certains fichiers ou dossiers sont manquants.');
  console.log('Consultez le README.md pour les instructions d\'installation.');
}

console.log('\n📖 Documentation complète disponible dans README.md');
