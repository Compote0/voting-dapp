import BackButton from './components/BackButton';
import React from 'react';

function NotFound() {
  return (
    <div className="error">
      <h1 className="error-title">404 - Page non trouvée</h1>
      <BackButton />
    </div>
  );
}

export default NotFound;
