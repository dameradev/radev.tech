import React from 'react';

import { MoonIcon, SunIcon } from '@heroicons/react/outline';
import { ThemeContext } from '@/components/ThemeContext';

const Switch = require('@headlessui/react').Switch;

const ThemeSwitch = ({ className = '' }) => {
  const { toggle, toggleFunction } = React.useContext(ThemeContext);

  return (
    <Switch
      checked={!toggle}
      onChange={() => {
        toggleFunction();
      }}
      className={`bg-skin-fg z-10 relative flex justify-between items-center flex-shrink-0 h-8 w-16 px-1 border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-skin-focus focus-visible:ring-opacity-75 ${className}`}
    >
      {toggle && <SunIcon className='w-5 h-5 text-skin-base' />}
      <span className='sr-only'>Use setting</span>
      <span
        aria-hidden='true'
        className='bg-skin-base
        pointer-events-none inline-block h-5 w-5 rounded-full shadow-lg transform ring-0 transition-colors ease-in-out duration-500'
      />
      {!toggle && <MoonIcon className='w-5 h-5 text-skin-base' />}
    </Switch>
  );
};

export default ThemeSwitch;
