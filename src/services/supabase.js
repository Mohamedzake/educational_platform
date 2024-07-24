import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ovbwqglayexjbfkstmgg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92YndxZ2xheWV4amJma3N0bWdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcyNDA4NTAsImV4cCI6MjAyMjgxNjg1MH0.hPnvl_oLcdOyQblE-TuKZQQ5X3ZrAToO9wxKq2Mt0gY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
