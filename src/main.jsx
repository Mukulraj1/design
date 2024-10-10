import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'


// import Hero from './components/Hero.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    {/* <Hero/> */}
   
    <App />
  
  </StrictMode>,
)
