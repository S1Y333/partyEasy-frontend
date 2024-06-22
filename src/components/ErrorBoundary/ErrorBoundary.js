// ErrorBoundary.js
import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
);

const ErrorBoundary = ({ children }) => (
  <ReactErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => {
      // Reset the state of your application so the error doesn't happen again
      window.location.href = "/";
    }}
  >
    {children}
  </ReactErrorBoundary>
);

export default ErrorBoundary;

