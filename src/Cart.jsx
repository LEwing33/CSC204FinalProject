import React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; 
import ApparelList from './components/apparelObject';
import RemoveFromCart from './components/removeFromCart';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    const { data, error } = await supabase.from('cart').select('*');
    if (error) console.error(error);
    else setCartItems(data || []);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const cartPrice = cartItems.reduce((total, item) => total + (item.cost || 0), 0);

  return (
    <div className="Cart">
      <nav>
        <ul>
          <li><a href="/index.html">Home</a></li>
          <li><a href="/cart.html">Cart</a></li>
          <li><a href="/checkout.html">Checkout</a></li>
        </ul>
      </nav>

      <h1>My Cloud Cart</h1>

      <div className="inventory-grid">
        {cartItems.map((item) => (
          <div key={item.id}>
            <ApparelList 
              apparelNo={{
                id: item.item_id,
                itemName: item.item_name,
                cost: item.cost,
                imagePath: item.image_path,
                category: item.category || "N/A",
                color: item.color || "N/A",
                brand: item.brand || "N/A",
                status: item.status || "In Stock",
                size: [] // Empty array so .map doesn't crash
              }} 
              savedSize={item.selected_size} 
              dbId={item.id} // This is the primary key from Supabase
              onRemove={fetchCart} // Pass the refresh function
            />
          </div>
        ))}
      </div>
      <p>Cart Price: ${cartPrice.toFixed(2)}</p>
    </div>
  );
}

export default Cart;