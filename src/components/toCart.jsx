import React from 'react';
import { supabase } from '../supabaseClient';

const ToCart = ({ apparelNo, selectedSize }) => {
    const addToCart = async () => {
        if (!selectedSize) {
            alert("Please select a size first!");
            return;
        }

        const { error } = await supabase
            .from('cart')
            .insert([
                { 
                    item_id: apparelNo.id, 
                    item_name: apparelNo.itemName, 
                    cost: apparelNo.cost,
                    selected_size: selectedSize,
                    image_path: apparelNo.imagePath,
                    category: apparelNo.category,
                    brand: apparelNo.brand,
                    color: apparelNo.color,
                    status: apparelNo.status
                }
            ]);

        if (error) {
            alert("Error adding to database: " + error.message);
        } else {
            alert(`${apparelNo.itemName} added to cloud cart!`);
        }
    };

    return (
        <div className="SentToCard">
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    );
};

export default ToCart;