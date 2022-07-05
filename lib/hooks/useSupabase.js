import { createClient } from '@supabase/supabase-js';

import { useState } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_CLIENT_KEY;
// https://cytpssgpodczcaxfmgoc.functions.supabase.co/increment_page_view

const supabaseClient = createClient(supabaseUrl, supabaseKey);

const useSupabase = () => {
  const [session, setSession] = useState(
    supabaseClient.auth.session()
  );

  supabaseClient.auth.onAuthStateChange(async (_event, session) => {
    setSession(session);
  });

  return { session, supabaseClient };
};

export { useSupabase, supabaseClient };
