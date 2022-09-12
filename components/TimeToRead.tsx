import { BookOpenIcon } from '@heroicons/react/outline';
import React from 'react';

const TimeToRead = ({ timeToRead }) => {
  return (
    <p className='text-center items-center flex gap-2'><BookOpenIcon className="w-5" /> <span className=''>{Math.round(timeToRead.minutes)} min read</span></p>
  );
};

export default TimeToRead;