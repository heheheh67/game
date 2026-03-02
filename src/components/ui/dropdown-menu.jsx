import React, { createContext, useContext, useMemo, useState } from 'react';

const DropdownContext = createContext(null);

export function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);
  return <DropdownContext.Provider value={value}><div style={{ position: 'relative' }}>{children}</div></DropdownContext.Provider>;
}

export function DropdownMenuTrigger({ asChild, children }) {
  const ctx = useContext(DropdownContext);
  if (!ctx) return children;
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: () => ctx.setOpen(!ctx.open),
    });
  }
  return <button type="button" onClick={() => ctx.setOpen(!ctx.open)}>{children}</button>;
}

export function DropdownMenuContent({ children, className = '', align = 'start' }) {
  const ctx = useContext(DropdownContext);
  if (!ctx?.open) return null;
  const right = align === 'end' ? { right: 0 } : { left: 0 };
  return <div className={className} style={{ position: 'absolute', top: '110%', ...right, background: 'white', border: '1px solid #e5e7eb', borderRadius: 8, zIndex: 10 }}>{children}</div>;
}

export function DropdownMenuItem({ children, asChild, onClick, className = '' }) {
  const ctx = useContext(DropdownContext);
  const closeThen = () => {
    onClick?.();
    ctx?.setOpen(false);
  };
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick: closeThen, className: `${children.props.className || ''} ${className}`.trim() });
  }
  return <button type="button" onClick={closeThen} className={className}>{children}</button>;
}

export function DropdownMenuSeparator() {
  return <hr style={{ border: 0, borderTop: '1px solid #e5e7eb', margin: 0 }} />;
}
