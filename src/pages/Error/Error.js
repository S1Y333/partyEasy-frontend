import React from 'react';

const NotFoundPage = ({ error, resetErrorBoundary }) => {
  console.log('Error occurred', error);

  return (
    <>
      <h1>404</h1>
      <p>Can't find what you're looking for, sorry!</p>
      <button onClick={resetErrorBoundary}>
        Refresh page
      </button>
    </>
  );
}

export default NotFoundPage;