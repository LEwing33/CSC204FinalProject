import React from 'react';
import { useState } from 'react'
import './App.css'
import './Cart.jsx'
import './Checkout.jsx'
import ApparelList from './components/apparelObject'
// Import the JSON directly
import apparelDataRaw from './assets/clothing.json'; 

function App() {
  // No more useEffect or fetch needed for local files!
  const [apparelData] = useState(apparelDataRaw);

  return (
    <div className="App">
      <nav>
        <ul>
          <li><a href="/index.html">Home</a></li>
          <li><a href="/cart.html">Cart</a></li>
          <li><a href="/checkout.html">Checkout</a></li>
        </ul>
        
      </nav>

      <h1>My Digital Shop</h1>

      <div className="inventory-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {apparelData.map((item) => (
          <ApparelList key={item.id} apparelNo={item} />
        ))}
      </div>
    </div>
  )
}

export default App;