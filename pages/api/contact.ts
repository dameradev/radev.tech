import { supabaseClient } from '@/lib/hooks/useSupabase';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    // Call our stored procedure with the page_name, email, message set by the request params name, email, message
    await supabaseClient.functions.invoke('contact-form', { body: req.body });

    return res.status(200).json({
      message: `Successfully contacted`,
    });
  }

  return res.status(400).json({
    message: 'Unsupported Request',
  });
};
export default handler;
