import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <h1>Vite Dev</h1>
    <p>This page tests the widget integration.</p>
    <App />
  </StrictMode>,
)
