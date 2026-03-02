import React from 'react';

export function Button({ className = '', variant = 'default', size, ...props }) {
  const base = 'inline-flex items-center justify-center border rounded-md px-3 py-2 cursor-pointer';
  const variants = {
    default: 'bg-emerald-600 text-white border-emerald-600',
    ghost: 'bg-transparent border-transparent',
    outline: 'bg-white text-gray-900 border-gray-300',
  };
  const sizes = {
    icon: 'h-9 w-9 p-0',
  };

  return <button {...props} className={`${base} ${variants[variant] || variants.default} ${size ? sizes[size] || '' : ''} ${className}`} />;
}
