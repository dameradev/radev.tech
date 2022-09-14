

import { supabaseClient } from '../../lib/hooks/useSupabase';

export default async function handler(
  req,
  res
) {

  console.log('here')
  if (req.method === 'POST') {
    // Call our stored procedure with the page_name, email, message set by the request params name, email, message
    await supabaseClient.functions.invoke("contact-form", { body: req.body });
    

    return res.status(200).json({
      message: `Successfully contacted`
    });
  }

  // if (req.method === 'GET') {
  //   // Query the pages table in the database where slug equals the request params slug.
  //   const response = await supabaseClient
  //     .from('posts')
  //     .select('view_count')
  //     .filter('slug', 'eq', req.query.slug);

  //   // console.log(response)
  //   if (response?.data) {
  //     return res.status(200).json({
  //       total: response?.data[0]?.view_count || null
  //     });
  //   }
  // }

  return res.status(400).json({
    message: 'Unsupported Request'
  });
}
