import { supabaseClient } from '@/lib/hooks/useSupabase';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { slug } = req.query;
    const { react } = JSON.parse(req.body);

    console.log(slug, react, 'test')
    // Call our stored procedure with the page_slug set by the request params slug
    await supabaseClient.functions.invoke('react_to_post', {
      body: JSON.stringify({ slug, react }),
    });

    return res.status(200).json({
      message: `Successfully incremented page: ${req.query.slug}`,
    });
  }

  if (req.method === 'GET') {
    // Query the pages table in the database where slug equals the request params slug.
    const response = await supabaseClient
      .from('posts')
      .select('like, love, smile')
      .filter('slug', 'eq', req.query.slug);

    if (response?.data) {
      return res.status(200).json({
        like: response?.data[0]?.like || 0,
        love: response?.data[0]?.love || 0,
        smile: response?.data[0]?.smile || 0,
      });
    }
  }

  return res.status(400).json({
    message: 'Unsupported Request',
  });
};

export default handler;
