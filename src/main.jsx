import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initSecurityShield } from './utils/securityShield.js'

// Initialize anti-bot, anti-inspect, and right-click protection shield
initSecurityShield()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
