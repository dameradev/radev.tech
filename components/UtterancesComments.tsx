import React, { useEffect, useRef } from "react";

const UtterancesComments = () => {
  const ref = useRef();

  useEffect(() => {
    const script = document.createElement("script");

    const config = {
      src: "https://utteranc.es/client.js",
      repo: "dameradev/radev.tech",
      label: "✨💬✨",
      theme: "github-dark",
      crossOrigin: "anonymous",
      defer: true,
    };

    Object.entries(config).forEach(([key, value]) => {
      // @ts-ignore
      script.setAttribute(key, value);
    });

    setTimeout(() => {
      // @ts-ignore
      ref.current.append(script);
    }, 300);
  }, []);
  // @ts-ignore
  return <div ref={ref} />;
};

export default UtterancesComments;
