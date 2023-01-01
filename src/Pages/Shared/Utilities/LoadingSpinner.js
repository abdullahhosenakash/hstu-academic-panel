import React, { useState } from 'react';
import { BarLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div className='absolute top-16'>
      <BarLoader
        color='#4338ca'
        width={window.screen.width}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
};

export default LoadingSpinner;
