import { LinkedinShareButton, TwitterShareButton } from 'react-share';

import { getArticlePublicUrl } from '@/lib/utils';
import { useCopyToClipboard } from '@/lib/hooks/useCopyToClipboard';
import { FaCopy, FaLinkedin, FaTwitter } from 'react-icons/fa';

type Props = {
  slug: string;
  title: string;
};

export function ShareArticle({ slug, title }: Props) {
  const [isCopied, handleCopy] = useCopyToClipboard(1500);
  const pubilcUrl = getArticlePublicUrl(slug);
  return (
    <div className='lg:mt-32 mb-12 lg:fixed right-4 top-0 flex items-center space-x-3 m-0 justify-center mt-10'>
      <span>Share on social media</span>
      <TwitterShareButton url={pubilcUrl} title={title} via={'dameradev'}>
        <FaTwitter />
      </TwitterShareButton>
      <LinkedinShareButton title={title} url={pubilcUrl}>
        <FaLinkedin />
      </LinkedinShareButton>
      <button
        className={`group ${isCopied ? 'text-secondary' : ''}`}
        onClick={() => handleCopy()}
      >
        <span className='sr-only'>Copy code</span>
        <FaCopy />
      </button>
    </div>
  );
}
