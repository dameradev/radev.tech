import React, { useEffect, useState } from 'react';
import { ThemeContext } from '@/lib/themeContext';

const Page = ({ children }) => {
  const { toggle } = React.useContext(ThemeContext);
  const [isDark, setIsDark] = useState(toggle);

  useEffect(() => {
    if (toggle !== isDark) setIsDark(toggle);
  }, [toggle]);

  return (
    <div
      className={`main-wrapper bg-skin-base text-skin-fg min-h-[100vh] ${
        isDark ? 'dark' : 'light'
      }`}
    >
      {children}
    </div>
  );
};

export default Page;
