import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
// --- ADD THIS IMPORT ---
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* --- WRAP APP COMPONENT WITH HASHROUTER --- */}
    <HashRouter> 
      <App />
    </HashRouter>
    {/* ------------------------------------------- */}
  </React.StrictMode>,
)