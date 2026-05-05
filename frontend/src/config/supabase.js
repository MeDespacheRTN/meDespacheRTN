import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gpfouzawbqkmhepsblyd.supabase.co";
const supabaseAnonKey = "sb_publishable_Rh6xKttMnmCqqkOjxqU48g_xjFMT6BR";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);