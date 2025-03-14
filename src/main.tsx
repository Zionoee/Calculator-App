
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MyProviders } from './providers/provider.tsx'

createRoot(document.getElementById('root')!).render(
  
    <MyProviders>
        <App />
    </MyProviders>
)



// npm i tailwindcss @tailwindcss/vite react-icons react-router-dom framer-motion @reduxjs/toolkit react-redux @tanstack/react-query