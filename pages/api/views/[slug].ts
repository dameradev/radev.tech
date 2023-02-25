import { supabaseClient } from '@/lib/hooks/useSupabase';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { slug } = req.query;
    // Call our stored procedure with the page_slug set by the request params slug
    await supabaseClient.functions.invoke('increment_page_view', {
      body: JSON.stringify({ slug }),
    });

    return res.status(200).json({
      message: `Successfully incremented page: ${req.query.slug}`,
    });
  }

  if (req.method === 'GET') {
    // Query the pages table in the database where slug equals the request params slug.
    const response = await supabaseClient
      .from('posts')
      .select('view_count')
      .filter('slug', 'eq', req.query.slug);

    if (response?.data) {
      return res.status(200).json({
        total: response?.data[0]?.view_count || null,
      });
    }
  }

  return res.status(400).json({
    message: 'Unsupported Request',
  });
};

export default handler;
