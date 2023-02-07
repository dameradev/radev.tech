import { supabaseClient } from "../../../lib/hooks/useSupabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { slug } = req.query;
    const { comment, name } = JSON.parse(req.body);
    // console.log("comment", );
    

    await supabaseClient.functions.invoke("comment_on_post", {
      body: JSON.stringify({ slug, text: comment, name }),
    });
    // { body: JSON.stringify({ slug }) });

    return res.status(200).json({
      message: `Successfully incremented page: ${req.query.slug}`,
    });
  }

  if (req.method === "GET") {
    // Query the pages table in the database where slug equals the request params slug.
    const response = await supabaseClient
      .from("posts")
      .select("id")
      .filter("slug", "eq", req.query.slug);

    const comments = await supabaseClient
      .from("comments")
      .select("text, name")
      .filter("post_id", "eq", response?.data?.[0]?.id);

    if (comments?.data) {
      return res.status(200).json({
        comments: comments?.data,
      });
    }
  }

  return res.status(400).json({
    message: "Unsupported Request",
  });
}
