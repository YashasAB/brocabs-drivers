import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Handle SPA routing for direct URL access
(function() {
  const originalPath = sessionStorage.getItem('originalPath');
  if (originalPath && window.location.pathname === '/') {
    // Restore the original path
    window.history.replaceState(null, '', originalPath);
    sessionStorage.removeItem('originalPath');
  }
})();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
