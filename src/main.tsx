import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CurrentPathProvider } from 'context/CurrentPathContext.tsx';
import { ThemeProvider } from 'context/ThemeContext.tsx';
import App from './App.tsx';
import './assets/styles/App.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CurrentPathProvider>
          <App />
        </CurrentPathProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
