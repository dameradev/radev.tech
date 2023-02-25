export const getContentBlocks = async ({ notion, page }) => {
  let content;
  let blocks = await notion.blocks.children.list({
    block_id: page.id,
  });

  content = [...blocks.results];

  while (blocks.has_more) {
    blocks = await notion.blocks.children.list({
      block_id: page.id,
      start_cursor: blocks.next_cursor,
    });

    content = [...content, ...blocks.results];
  }
  return content; 
};
