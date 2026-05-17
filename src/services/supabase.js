import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://vmmzppvpzyedockqszyb.supabase.co";
const supabaseKey = "sb_publishable_n_0-Y06jjuBiwVZu6Z3JHA_cl2yEtqO";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
