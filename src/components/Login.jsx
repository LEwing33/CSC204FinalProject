import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Login = ({ onAuthChange }) => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(''); // Changed from email
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (onAuthChange) onAuthChange(currentUser);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            const currentUser = session?.user ?? null;
            setUser(currentUser);
            if (onAuthChange) onAuthChange(currentUser);
        });

        return () => subscription.unsubscribe();
    }, [onAuthChange]);

    const handleSubmit = async () => {
        setError('');
        setMessage('');
        setLoading(true);

        if (!username || !password) {
            setError('Please enter both username and password.');
            setLoading(false);
            return;
        }

        const internalEmail = `${username.trim()}@myshop.local`;

        if (isSignUp) {
            const { error } = await supabase.auth.signUp({ 
                email: internalEmail, 
                password: password 
            });
            if (error) setError(error.message);
            else setMessage('Account created! You can now log in.');
        } else {
            const { error, data } = await supabase.auth.signInWithPassword({ 
                email: internalEmail, 
                password: password 
            });
            if (error) {
                setError(error.message);
            }else if (data.user) {
                window.location.reload();
            }
        }
        setLoading(false);
    };

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            window.location.reload(); 
        } else {
            setError(error.message);
        }
    };

    if (user) {
        const displayName = user.email.split('@')[0];
        return (
            <div className="auth-bar">
                <span>Welcome, <strong>{displayName}</strong></span>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
        );
    }

    return (
        <div className="auth-bar">
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
            <button 
                className="switch-btn"
                onClick={() => { setIsSignUp(!isSignUp); setError(''); setMessage(''); }}
            >
                {isSignUp ? 'Already have a username? Sign In' : 'Need a username? Sign Up'}
            </button>

            {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
            {message && <p style={{ color: 'green', fontSize: '12px' }}>{message}</p>}
        </div>
    );
};

export default Login;