import React from "react";
import { useState, useEffect }  from 'react';
import ToCheckout from "./components/toCheckout.jsx";
import { supabase } from "./supabaseClient";


function Checkout(){
    
    const [cartItems, setCartItems] = useState([]);

    const fetchCart = async () => {
        const { data, error } = await supabase
            .from("cart")
            .select("*");
        if ( error ) {
            console.error(error);
        } 
        else{
            setCartItems(data || []);
        }
    };
    useEffect(() => {
        fetchCart();
    }, []);

    const totalPrice = cartItems.reduce(
        (total, item) => total + (item.cost || 0), 0
    );
            
    return(
        <div>
            <div className="Checkout">
                <nav>
                    <ul>
                    <li><a href="/index.html">Home</a></li>
                    <li><a href="/cart.html">Cart</a></li>
                    <li><a href="/checkout.html">Checkout</a></li>
                    </ul>
                </nav>
            </div>

            <div>
                <h1>Checkout</h1>
                <h2>Review order and complete checkout process</h2>

                <div className="checkout">
                    {cartItems.map((item) => 
                        <div key={item.id}>
                            <p>{item.item_name}</p>
                            <p>Size: {item.selected_size}</p>
                            <p>${item.cost}</p>
                        </div>
                    )}                
                </div>

                <h4>Total: ${totalPrice.toFixed(2)}</h4>
                <ToCheckout onCheckout={fetchCart}/>
            </div>
        </div>
    );
}

export default Checkout