import React from 'react';
import { BarLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div className='absolute top-16 left-0 right-0'>
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
