import React, { useRef } from 'react';

export default function HorizontalScroll({ children, height, width }) {
  const containerRef = useRef(null);

  return (
    <div 
      ref={containerRef} 
      className="overflow-x-auto white-space flex flex-row gap-6"
      style={{ height: height, width: width }} 
    >
      {children}
    </div>
  );
}
