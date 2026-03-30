import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './index.css'
import Checkout from './Checkout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Checkout />
    <ToastContainer position="bottom-right" autoClose={3000} />
  </StrictMode>,
)
