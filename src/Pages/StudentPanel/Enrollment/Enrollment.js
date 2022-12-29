import React, { useEffect, useState } from 'react';
import useCurrentTime from '../../../hooks/useCurrentTime';

const Enrollment = () => {
  const [currentTime] = useCurrentTime();
  const [count, setCount] = useState(99);
  useEffect(() => {
    if (count < 0) setCount(0);
    else setCount(count - 1);
    console.log(currentTime);
  }, [currentTime]);
  console.log('a');
  return (
    <div>
      <h2 className='text-3xl text-center py-5'>Enrollment</h2>
      <div>
        <div className='grid grid-flow-col gap-5 text-center auto-cols-max'>
          <div className='flex flex-col'>
            <span className='countdown font-mono text-xl'>
              <span style={{ '--value': count }}></span>
            </span>
            days
          </div>
          <div className='flex flex-col'>
            <span className='countdown font-mono text-5xl'>
              <span style={{ '--value': 10 }}></span>
            </span>
            hours
          </div>
          <div className='flex flex-col'>
            <span className='countdown font-mono text-5xl'>
              <span style={{ '--value': 24 }}></span>
            </span>
            min
          </div>
          <div className='flex flex-col'>
            <span className='countdown font-mono text-5xl'>
              <span style={{ '--value': 53 }}></span>
            </span>
            sec
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enrollment;
