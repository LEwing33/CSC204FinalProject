import { createClient } from '@supabase/supabase-js'

// Use the strings directly if you don't have a .env file set up yet
const supabaseUrl = "https://umouqmqmjauissaqfbrt.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtb3VxbXFtamF1aXNzYXFmYnJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzg3NjMsImV4cCI6MjA4ODY1NDc2M30.ynXQQmBlSmMIbggQKeiawAEu6KBCcsY8vt-IYILrYew"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'store' 
  }
})

// Function to get or create a unique Session ID
export const getSessionId = () => {
    let sessionId = localStorage.getItem('shop_session_id');
    
    if (!sessionId) {
        // Generate a random string (e.g., 'sess_9f2k1a...')
        sessionId = 'sess_' + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('shop_session_id', sessionId);
    }
    
    return sessionId;
};