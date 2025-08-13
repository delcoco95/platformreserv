const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Démarrage des serveurs de développement...\n');

// Démarrer le backend temporaire
console.log('📡 Démarrage du backend...');
const backend = spawn('node', ['dev-server.js'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'pipe'
});

backend.stdout.on('data', (data) => {
  console.log(`[BACKEND] ${data.toString().trim()}`);
});

backend.stderr.on('data', (data) => {
  console.error(`[BACKEND ERROR] ${data.toString().trim()}`);
});

// Attendre un peu que le backend démarre avant le frontend
setTimeout(() => {
  console.log('🎨 Démarrage du frontend...');
  const frontend = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, 'frontend'),
    stdio: 'pipe',
    shell: true
  });

  frontend.stdout.on('data', (data) => {
    console.log(`[FRONTEND] ${data.toString().trim()}`);
  });

  frontend.stderr.on('data', (data) => {
    console.error(`[FRONTEND ERROR] ${data.toString().trim()}`);
  });

  frontend.on('close', (code) => {
    console.log(`[FRONTEND] Processus terminé avec le code ${code}`);
  });
}, 2000);

backend.on('close', (code) => {
  console.log(`[BACKEND] Processus terminé avec le code ${code}`);
});

// Gestion propre de l'arrêt
process.on('SIGINT', () => {
  console.log('\n🛑 Arrêt des serveurs...');
  backend.kill();
  process.exit();
});
