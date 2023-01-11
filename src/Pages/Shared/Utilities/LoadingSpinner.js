import React, { useLayoutEffect, useRef, useState } from 'react';
import { BarLoader } from 'react-spinners';
import useCurrentTime from '../../../hooks/useCurrentTime';

const LoadingSpinner = () => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [currentTime] = useCurrentTime();

  useLayoutEffect(() => {
    setWidth(ref.current?.clientWidth);
  }, [currentTime]);
  return (
    <>
      <div className='sticky top-0 left-0'>
        <BarLoader
          color='#4338ca'
          width={width}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      </div>
      <div ref={ref}></div>
    </>
  );
};

export default LoadingSpinner;
