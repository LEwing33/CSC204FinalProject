import React, { useState, useEffect } from 'react';
import './App.css';
import ApparelList from './components/apparelObject';
import Login from './components/Login';
import { supabase } from './supabaseClient';

function App() {
  const [apparelData, setApparelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .schema('store')
        .from('apparel')
        .select('*');

      if (error) {
        console.error("Error fetching inventory:", error.message);
      } else {
        setApparelData(data || []);
      }
      setLoading(false);
    };

    fetchInventory();
  }, []);

  return (
    <div className="App">
      <nav>
        <ul>
          <li><a href="/index.html">Home</a></li>
          <li><a href="/cart.html">Cart</a></li>
          <li><a href="/checkout.html">Checkout</a></li>
        </ul>
        {/* Login lives in the nav so it's always visible */}
        <Login onAuthChange={setUser} />
      </nav>

      <h1>My Digital Shop</h1>

      {!user && (
        <p style={{ color: '#888' }}>Sign in to add items to your cart.</p>
      )}

      {loading ? (
        <p>Loading catalog...</p>
      ) : (
        <div className="inventory-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {apparelData.map((item) => (
            <ApparelList
              key={item.id}
              apparelNo={{
                ...item,
                itemName: item.item_name,
                imagePath: item.image_path,// correct
                size_chart: item.size_chart || []
              }}
              isLoggedIn={!!user} // Pass login state down so ToCart can gate itself
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
