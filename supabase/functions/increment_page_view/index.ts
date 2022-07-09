// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.


import { createClient } from 'https://esm.sh/@supabase/supabase-js@^1.33.2'
import { serve } from "https://deno.land/std@0.131.0/http/server.ts"

const supabaseUrl = 'https://cytpssgpodczcaxfmgoc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5dHBzc2dwb2RjemNheGZtZ29jIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTcwMjg0MzcsImV4cCI6MTk3MjYwNDQzN30.gAR4WXZ8UCfkZvbD15HUabhiHNiReZ9fTDYz6AMkW70';



export const supabaseClient = createClient(
  supabaseUrl, supabaseKey
  // Supabase API URL - env var exported by default when deployed.

  // Deno.env.get('SUPABASE_URL') ?? '',
  // // Supabase API ANON KEY - env var exported by default when deployed.
  // Deno.env.get('SUPABASE_ANON_KEY') ?? ''
)

console.log("Hello from Functions!")

serve(async (req) => {
  const { slug } = await req.json()

  const { data } = await supabaseClient.from('posts').select()
    .eq('slug', slug);
  let res;
  if (data?.length) {
    res = await supabaseClient.from('posts').update({ view_count: data?.[0].view_count + 1 }).eq("slug", slug)
  } else {
    // insert record into supabase
    res = await supabaseClient.from('posts').insert({ slug, view_count: 1 })
  }

  // const data = {
  //   message: `Hello carce!`,
  // }

  return new Response(
    JSON.stringify(res),
    { headers: { "Content-Type": "application/json" } },
  )
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
