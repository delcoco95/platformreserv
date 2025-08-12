import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/globals.css';

// Configuration globale des erreurs
window.addEventListener('unhandledrejection', (event) => {
  console.error('Erreur non gérée:', event.reason);
});

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
