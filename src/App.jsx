import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ApparelList from './components/apparelObject';
import Login from './components/Login';
import Cart from './Cart';
import Checkout from './Checkout';
import { supabase } from './supabaseClient';

function Home() {
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
      if (error) console.error("Error fetching inventory:", error.message);
      else setApparelData(data || []);
      setLoading(false);
    };
    fetchInventory();
  }, []);

  return (
    <div className="App">
      <Nav />
      <Login onAuthChange={setUser} />
      <h1>My Digital Shop</h1>
      {loading ? (
        <p>Loading catalog...</p>
      ) : (
        <div className="inventory-grid">
          {apparelData.map((item, index) => (
            <ApparelList
              key={item.Apparel_ID || `apparel-${index}`} 
              apparelNo={{
                itemName: item.item_name,
                imagePath: item.image_path,
                brand: item.brand,
                cost: item.cost,
                item_id: item.Apparel_ID,
                category: item.category,
                status: item.status,
                color: item.color,
                size_chart: item.size_chart || []
              }}
              isLoggedIn={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Nav() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;