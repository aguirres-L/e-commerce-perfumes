import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SelectHeroProvider } from './context/SelectHeroContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>  
     <SelectHeroProvider>
    <App />
  </SelectHeroProvider>
  </StrictMode>,
)
