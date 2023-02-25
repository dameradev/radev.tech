import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';

export const CoverImage = ({ title, url, slug }) => {
  const image = (
    <Image
      fill
      style={{ objectFit: 'cover', objectPosition: 'center' }}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-small', {
        'hover:shadow-medium transition-shadow duration-200 rounded-2xl': slug,
      })}
      src={url}
    />
  );
  return image;

}
