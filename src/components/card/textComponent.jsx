import React, { useEffect, useRef } from 'react';

const TextComponent = ({ text, textColor }) => {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    const handleVerticalOverflow = () => {
      const maxHeight = container.clientHeight;
      const lineHeight = parseInt(getComputedStyle(container).lineHeight, 10);

      const words = text.split(' ');
      let currentLine = '';
      let lines = 1;

      for (const word of words) {
        const testText = currentLine ? `${currentLine} ${word}` : word;

        if (container.scrollHeight > maxHeight && lines < 2) {
          currentLine += `${currentLine ? ' ' : ''}${word}-`;
        } else {
          currentLine += `${currentLine ? ' ' : ''}${word}`;
        }

        if (container.scrollHeight > maxHeight) {
          lines++;
          currentLine = `${word}-`;
        }
      }

      container.innerHTML = currentLine;
    };
    handleVerticalOverflow();
    window.addEventListener('resize', handleVerticalOverflow);
    return () => {
      window.removeEventListener('resize', handleVerticalOverflow);
    };
  }, [text]);

  return (
    <div
      ref={containerRef}
      style={{
        fontSize: 'sm',
        color: textColor,
        fontWeight: '100',
        maxWidth: '40ch',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
        textOverflow: 'ellipsis',
      }}
    >
      {text}
    </div>
  );
};

export default TextComponent;
