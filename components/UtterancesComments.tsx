import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const UtterancesComments = ({ repo, theme, issueTerm }) => {
  const ref = useRef();

  useEffect(() => {
    const script = document.createElement('script');

    const config = {
      src: 'https://utteranc.es/client.js',
      repo: repo,
      'issue-term': issueTerm,
      theme: theme,
      crossOrigin: 'anonymous',
      defer: true
    };

    Object.entries(config).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    setTimeout(() => {
      // @ts-ignore
      ref.current.append(script);
    }, 300);
  }, [repo, theme, issueTerm]);

  return <div ref={ref} />;
};
export default UtterancesComments;