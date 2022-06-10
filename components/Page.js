import { ThemeContext } from 'lib/themeContext';
import { Main, NextScript } from 'next/document';
import React, { useEffect, useState } from 'react';
import { GlobalStyle } from 'styles/GlobalStyle';

const Page = ({ children }) => {
  const { toggle } = React.useContext(ThemeContext)

  const [isDark, setIsDark] = useState(toggle);


  useEffect(() => {
    if (toggle !== isDark) setIsDark(toggle)
    
  }, [toggle]);



  return (
    <div className={`main-wrapper bg-skin-base text-skin-fg ${isDark ? "dark" : "light"}`}>
    
      {children}
    </div>
  );
};

export default Page;