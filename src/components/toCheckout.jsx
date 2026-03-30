import React from 'react';
import emailjs from '@emailjs/browser';
import { supabase } from '../supabaseClient';
import { toast } from 'react-toastify';

const ToCheckout = ({ onCheckout, cartItems, totalAmount }) => {
    
    const handleSendOrder = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user || cartItems.length === 0) {
            toast.error("Cart is empty or you aren't logged in!");
            return;
        }

        // Format the cart items for the emai
        const orderSummary = cartItems.map(item => 
            `- ${item.item_name} (${item.selected_size}): $${item.cost}`
        ).join('\n');

        const templateParams = {
            user_email: user.email,
            order_details: orderSummary,
            total_price: `$${totalAmount.toFixed(2)}`,
            // to_name: "Store Manager" // Or your name
        };

        try {
            // Send the Email
            await emailjs.send(
                'service_o13isfb', 
                'template_qfi9b7t', 
                templateParams, 
                '5tnKGgihisxUkvhQA'
            );

            // Clear the cart
            const { error: deleteError } = await supabase
                .schema('store')
                .from('cart')
                .delete()
                .eq('user_id', user.id);

            if (deleteError) throw deleteError;

            toast.success("Order sent successfully!");
            onCheckout(); // Refresh the UI

        } catch (err) {
            console.error("Checkout Error:", err);
            toast.error("Failed to complete checkout.");
        }
    };

    return (
        <button 
            className="CheckoutButton" 
            onClick={handleSendOrder}
        >
            Complete Purchase & Send Email
        </button>
    );
};

export default ToCheckout;
