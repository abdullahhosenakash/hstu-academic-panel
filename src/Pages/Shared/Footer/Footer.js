import React, { useEffect, useState } from 'react';
import useCurrentTime from '../../../hooks/useCurrentTime';

const Footer = () => {
  const [currentTime] = useCurrentTime();
  const [networkConnected, setNetworkConnected] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!navigator.onLine) {
      setShowMessage(true);
      setNetworkConnected(false);
    } else {
      setNetworkConnected(true);
    }
  }, [currentTime]);

  console.log(networkConnected);
  return (
    <div className='absolute bottom-0 right-0 left-0 text-center'>
      {/* {networkConnected ? (
        <p className='bg-green-500 text-white'>Back online</p>
      ) : (
        <p className='bg-slate-400 text-black'>No internet connection</p>
      )} */}
    </div>
  );
};

export default Footer;
