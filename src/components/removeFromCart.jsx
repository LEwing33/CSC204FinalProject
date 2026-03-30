import React from 'react';
import { supabase } from '../supabaseClient';

const RemoveFromCart = ({ itemId, onRemove }) => {
    const remove = async () => {
        const { error } = await supabase
            .schema('store')
            .from('cart')
            .delete()
            .eq('id', itemId); 

        if (error) {
            console.error("Error removing item:", error.message);
        } else {
            // Call the refresh function passed from Cart.jsx
            onRemove();
        }
    };

    return (
        <div className="RemoveAction">
            <button onClick={remove}>
                Remove from Cart
            </button>
        </div>
    );
};

export default RemoveFromCart;
