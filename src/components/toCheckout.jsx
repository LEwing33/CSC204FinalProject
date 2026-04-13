import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { supabase } from '../supabaseClient';
import { toast } from 'react-toastify';

const ToCheckout = ({ onCheckout, cartItems, totalAmount }) => {
    const [guestEmail, setGuestEmail] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        };
        checkUser();
    }, []);

    const handleSendOrder = async () => {
        const finalEmail = user ? user.email : guestEmail;

        if (!finalEmail) {
            toast.warn("Please enter an email address!");
            return;
        }

        const orderSummary = cartItems.map(item => 
            `- ${item.item_name} (${item.selected_size}): $${item.cost}`
        ).join('\n');

        const templateParams = {
            user_email: finalEmail,
            order_details: orderSummary,
            total_price: `$${totalAmount.toFixed(2)}`,
        };

        try {
            await emailjs.send('service_o13isfb', 'template_qfi9b7t', templateParams, '5tnKGgihisxUkvhQA');

            const sessionId = sessionStorage.getItem('shop_session_id');
            const identifier = user ? user.id : sessionId;

            await supabase.schema('store').from('cart').delete().eq('user_id', identifier);

            toast.success("Order sent successfully!");
            onCheckout(); 
        } catch (err) {
            toast.error("Failed to complete checkout.");
        }
    };

    return (
        <div className="checkout-actions">
            {!user && (
                <div className="guest-email-section">
                    <label>Contact Email:</label>
                    <input 
                        type="email" 
                        placeholder="Enter email for order confirmation" 
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="guest-input"
                    />
                </div>
            )}
            <button className="CheckoutButton" onClick={handleSendOrder}>
                Complete Purchase
            </button>
        </div>
    );
};

export default ToCheckout;