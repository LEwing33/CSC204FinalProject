import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Cart from './Cart.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cart />
  </StrictMode>,
)
