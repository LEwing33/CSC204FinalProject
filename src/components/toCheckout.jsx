import React from 'react';
import { supabase } from '../supabaseClient';

const ToCheckout = ({onCheckout}) => {
    const orderCheckout = async () => {
        const { error } = await supabase
            .from('cart')//this needs to be orders table for later!!!
            .insert([
                {created_at: new Date()}
            ]);
        if (error) {
            alert("Please fill out the necessary items!" + error.message);
            return;
        }
        await supabase
            .from('cart')
            .delete()
            .neq('id', 0);
        alert("Order complete!");
        if(onCheckout) //clear page after checkout is clicked
            onCheckout();
    };
    return (
        <div className="CheckoutButton">
            <button onClick={orderCheckout}>Checkout</button>
        </div>
    );
};

export default ToCheckout;