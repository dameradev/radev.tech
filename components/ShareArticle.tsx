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
    <div className=' top-0 flex flex-col items-center gap-4 m-0 justify-center mt-2'>
      {/* <span>Share on social media</span> */}
      <TwitterShareButton url={pubilcUrl} title={title} via={'dameradev'}>
        <FaTwitter className="w-5 h-5 fill-blue-400" />
      </TwitterShareButton>
      <LinkedinShareButton  className="relative " title={title} url={pubilcUrl}>
        <div  className='bg-white absolute w-5 h-5 top-1 left-1'/>
        <FaLinkedin className="w-7 h-7  fill-blue-500 z-10 relative" />

        
      </LinkedinShareButton>
      <button
        className={`group text-orange-400 ${isCopied ? '!text-secondary' : ''}`}
        onClick={() => handleCopy()}
      >
        <span className='sr-only'>Copy code</span>
        <FaCopy className="w-5 h-5" />
      </button>
    </div>
  );
}
