import React from 'react';

export default function DemoSubmitButton({ children, disabled, ...rest }) {
  return (
    <button type="submit" className="demo-submit" disabled={disabled} {...rest}>
      <span className="demo-submit-glow" aria-hidden="true" />
      <span className="demo-submit-ring" aria-hidden="true" />
      <span className="demo-submit-label">{children}</span>
    </button>
  );
}
