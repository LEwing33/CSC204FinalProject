import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'; // Import
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer position="bottom-right" autoClose={3000} />
  </StrictMode>,
)