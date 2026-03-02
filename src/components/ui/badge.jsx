import React from 'react';

export function Badge({ className = '', children }) {
  return <span className={`inline-flex rounded-full ${className}`}>{children}</span>;
}
