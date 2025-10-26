import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { AuthProvider } from "./context/authContext.jsx";
import { PsicologossProvider } from "./context/psicologos.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PsicologossProvider>
        <App />
      </PsicologossProvider>
    </AuthProvider>
  </StrictMode>,
)
