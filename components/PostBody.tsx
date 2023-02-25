const PostBody = ({ content }) => {
  return (
    <div
      className={`post-content  post text-xl`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default PostBody;
