import React from 'react';

export const LogoIcon = () => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <circle 
        cx="100" 
        cy="100" 
        r="95" 
        className="fill-background stroke-foreground" 
        strokeWidth="2"
      />
      <text 
        x="100" 
        y="125" 
        className="font-bold text-foreground" 
        fontSize="80"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
      >
        PA
      </text>
    </svg>
  );
};
