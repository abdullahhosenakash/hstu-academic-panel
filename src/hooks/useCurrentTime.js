import { useEffect, useState } from 'react';

const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTime]);
  return [currentTime];
};

export default useCurrentTime;
