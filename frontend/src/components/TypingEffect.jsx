import React, { useState, useEffect } from 'react';

function TypingEffect({ text }) {
  const [displayText, setDisplayText] = useState('');
  let index = 0;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDisplayText(text.slice(0, index));
      index++;
      if (index > text.length) {
        clearInterval(intervalId);
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [text]);

  return <h1>{displayText}</h1>;
}

export default TypingEffect;
