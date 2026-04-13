import React from 'react';
import { useState, useEffect } from 'react';
import  {supabase} from './supabaseClient';
import ApparelList from './components/apparelObject';
import Login from './components/Login';
import { Routes, Route, Link } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    // Check sessionStorage for the guest ID if no user is logged in
    const sessionId = sessionStorage.getItem('shop_session_id');
    const identifier = user ? user.id : sessionId;

    await supabase.schema('store').rpc('cleanup_guest_carts');

    if (!identifier) {
        setCartItems([]);
        return;
    }

    const { data, error } = await supabase
        .schema('store')
        .from('cart')
        .select('*')
        .eq('user_id', identifier); // Filter by whichever ID we are currently using

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
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/checkout">Checkout</Link></li>
        </ul>
        <Login />
      </nav>

      <h1>My Cloud Cart</h1>

      <div className="inventory-grid">
        {cartItems.map((item, index) => (
          <div key={item.id || index}> 
            <ApparelList
              apparelNo={{
                // item_id: item.id,
                itemName: item.item_name,
                cost: item.cost,
                imagePath: item.image_path,
                category: item.category || "N/A",
                color: item.color || "N/A",
                brand: item.brand || "N/A",
                size_chart: []
              }}
              savedSize={item.selected_size}
              dbId={item.id}
              onRemove={fetchCart}
            />
          </div>
        ))}
      </div>
      <p>Cart Price: ${cartPrice.toFixed(2)}</p>
    </div>
  );
}

export default Cart;
