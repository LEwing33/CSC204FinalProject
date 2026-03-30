import React from 'react';
import { supabase } from '../supabaseClient';
import { toast } from 'react-toastify'; // Import toast

const ToCart = ({ apparelNo, selectedSize }) => {
    const addToCart = async () => {
    if (!selectedSize) {
        toast.warn("Please select a size first!");
        return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        toast.error("Please log in to add items to your cart.");
        return;
    }

    const { error } = await supabase
        .schema('store')
        .from('cart')
        .insert([
            { 
                item_id: apparelNo.id, 
                item_name: apparelNo.itemName,   // Use itemName (from App.jsx)
                cost: apparelNo.cost,
                selected_size: selectedSize,
                image_path: apparelNo.imagePath, // Use imagePath (from App.jsx)
                category: apparelNo.category || "General",
                brand: apparelNo.brand || "Digital Shop",
                color: apparelNo.color || "N/A",
                user_id: user.id
            }
        ]);

    if (error) {
        toast.error("Cloud Error: " + error.message);
        console.error("Full Error Object:", error); // Check console for details
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