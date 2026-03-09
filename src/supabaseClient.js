import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://umouqmqmjauissaqfbrt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtb3VxbXFtamF1aXNzYXFmYnJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzg3NjMsImV4cCI6MjA4ODY1NDc2M30.ynXQQmBlSmMIbggQKeiawAEu6KBCcsY8vt-IYILrYew'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)