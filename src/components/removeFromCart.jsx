import React from 'react';
import { supabase } from '../supabaseClient';
import { toast } from 'react-toastify';

const RemoveFromCart = ({ itemId, onRemove }) => {
    const remove = async () => {
        const { error } = await supabase
            .schema('store')
            .from('cart')
            .delete()
            .eq('id', itemId);

        if (error) {
            toast.error("Failed to remove item from cart.");
        } else {
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