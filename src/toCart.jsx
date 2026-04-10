import React from 'react';
import { supabase } from '../supabaseClient';
import { toast } from 'react-toastify';

const ToCart = ({ apparelNo, selectedSize }) => {
    const addToCart = async () => {
        if (!selectedSize) {
            toast.warn("Please select a size first!");
            return;
        }

        const { data: { user } } = await supabase.auth.getUser();
        
        // Session ID fallback for guests
        let sessionId = localStorage.getItem('shop_session_id');
        if (!sessionId) {
            sessionId = 'sess_' + Math.random().toString(36).substring(2, 15);
            localStorage.setItem('shop_session_id', sessionId);
        }

        const cartIdentifier = user ? user.id : sessionId;

        const { error } = await supabase
            .schema('store')
            .from('cart')
            .insert([{ 
                item_id: apparelNo.id, 
                item_name: apparelNo.itemName,
                cost: apparelNo.cost,
                selected_size: selectedSize,
                image_path: apparelNo.imagePath,
                color: apparelNo.color,
                brand: apparelNo.brand,
                user_id: cartIdentifier 
            }]);

        if (error) {
            toast.error("Cloud Error: " + error.message);
        } else {
            toast.success(`${apparelNo.itemName} added to cart!`);
        }
    };

    return (
        <div className="SentToCard">
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    );
};

export default ToCart;