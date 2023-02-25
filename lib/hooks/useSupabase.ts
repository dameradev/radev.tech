import { createClient } from '@supabase/supabase-js';

import { useState } from 'react';
import { NEXT_PUBLIC_SUPABASE_CLIENT_KEY, NEXT_PUBLIC_SUPABASE_URL } from '../constants';

const supabaseUrl = NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = NEXT_PUBLIC_SUPABASE_CLIENT_KEY;
// https://cytpssgpodczcaxfmgoc.functions.supabase.co/increment_page_view

// const supabaseClient = createClient(supabaseUrl, supabaseKey);

// import { createClient } from '@supabase/supabase-js'


const options = {
  schema: 'public',
  headers: {
    'x-my-custom-header': 'my-app-name',
    "Authorization": `Bearer ${supabaseKey}`
  },
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true
}
const supabaseClient = createClient(supabaseUrl, supabaseKey, options)





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
