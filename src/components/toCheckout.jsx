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

        // 1. Format the cart items for the email body
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
            // 2. Send the Email
            // Replace these with your actual IDs from the EmailJS Dashboard
            await emailjs.send(
                'service_o13isfb', 
                'template_qfi9b7t', 
                templateParams, 
                '5tnKGgihisxUkvhQA'
            );

            // 3. Clear the cart in Supabase after successful email
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
            style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
            Complete Purchase & Send Email
        </button>
    );
};

export default ToCheckout;