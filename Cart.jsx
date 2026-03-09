import { useState } from 'react'
import './App.css'
import ApparelList from './components/apparelObject'
// Import the JSON directly
import apparelDataRaw from './assets/clothing.json'; 

function Cart() {
  // No more useEffect or fetch needed for local files!
  const [apparelData] = useState(apparelDataRaw);

  return (
    <div className="Cart">
      <nav>
        <ul>
          <li><a href="/index.html">Home</a></li>
          <li><a href="/cart.html">Cart</a></li>
        </ul>
        
      </nav>

      <h1>My Cart</h1>

      
    </div>
  )
}

export default Cart;