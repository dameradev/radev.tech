
import { fetcher } from '../lib/fetcher';
import useSWR from 'swr';
import { EyeIcon } from '@heroicons/react/outline';

const PageViews = ({ slug }) => {
  const { data } = useSWR<{ total: number }>(`/api/views/${slug}`, fetcher, {
    refreshInterval: 60000
  });

  const views = new Number(data?.total);

  return <span className='text-center  items-center flex gap-2'><EyeIcon className='w-5'/>{`${views > 0 ? views.toLocaleString() : '–––'} views`}</span>;
};

export default PageViews;
