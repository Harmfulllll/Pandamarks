import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import { Toaster } from "@/components/ui/toaster"
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    <Toaster />
    </BrowserRouter>
  </StrictMode>,
)
