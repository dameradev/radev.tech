import readingTime from 'reading-time'

export const getTimeToRead = (content) => {
  const text = []
  content.forEach(block => {
    if (block.type === "paragraph" || block.type === "bulleted_list_item") {
      block[block.type].text.forEach(value => text.push(value.plain_text))
      // text.push(block.text.content)
    } else if (block.type === "code") {
      block[block.type].text.forEach(value => text.push(value.text.content))
    }
  })
  const timeToRead = readingTime(text.join(" "));
  return timeToRead;
}