import React from 'react';
import { GiPartyPopper } from 'react-icons/gi';

interface ButtonProps {
  onClick: () => void; // Define the type for onClick
  children: React.ReactNode; // Define the type for children
}

// Use named export for the Button component
export const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
  <button
    className= " mb-5 bg-fuchsia-900 text-white px-4 py-2 rounded hover:bg-fuchsia-400 transition-all"
    onClick={onClick}
  >
    {children} {/* Render children here */}
    <GiPartyPopper className="ml-2 h-4 w-4 inline-block" />
  </button>
);
