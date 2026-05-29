import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const path = window.location.pathname;
const rootEl = document.getElementById('root');

if (path === '/checkout') {
  import('./pages/Checkout.jsx').then((mod) => {
    createRoot(rootEl).render(
      <StrictMode>
        <mod.default />
      </StrictMode>
    );
  });
} else if (path === '/cart') {
  import('./pages/Cart.jsx').then((mod) => {
    createRoot(rootEl).render(
      <StrictMode>
        <mod.default />
      </StrictMode>
    );
  });
} else {
  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

