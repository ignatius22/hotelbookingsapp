
import { createClient } from '@supabase/supabase-js'

// process.env.SUPABASE_KEY

export const supabaseUrl = 'https://gdayjueohkllflrsdhwc.supabase.co'
const supabaseKey =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkYXlqdWVvaGtsbGZscnNkaHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc4MTU3NjcsImV4cCI6MjAxMzM5MTc2N30.nhcpF5Pc530KVhU-RXm8Oy9JbNcqP-yl07rYbux6X2Y" 
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;