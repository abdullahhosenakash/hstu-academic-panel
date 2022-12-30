import React, { useEffect, useState } from 'react';
import useCurrentTime from '../../../hooks/useCurrentTime';

const TimeCountDown = ({ deadline, examStarted = false, timeUp = false }) => {
  const [currentTime] = useCurrentTime();
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (timeUp) {
      setMinutes(0);
      setSeconds(0);
    } else {
      const examDateInSeconds = new Date(
        new Date(deadline).getTime() - currentTime
      );
      const d = examDateInSeconds.getDate() - 1;
      const h = examDateInSeconds.getHours() - 6;
      const m = examDateInSeconds.getMinutes();
      const s = examDateInSeconds.getSeconds();
      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }
  }, [currentTime, deadline, timeUp]);

  return (
    <div className='flex gap-5'>
      {examStarted ? (
        ''
      ) : (
        <>
          <div>
            <span className='countdown font-mono text-xl'>
              <span style={{ '--value': days }} />
            </span>
            <sub>d</sub>
          </div>

          <div>
            <span className='countdown font-mono text-xl'>
              <span style={{ '--value': hours }} />
            </span>
            <sub>h</sub>
          </div>
        </>
      )}
      <div>
        <span className='countdown font-mono text-xl'>
          <span style={{ '--value': minutes }} />
        </span>
        <sub>m</sub>
      </div>
      <div>
        <span className='countdown font-mono text-xl'>
          <span style={{ '--value': seconds }} />
        </span>
        <sub>s</sub>
      </div>
    </div>
  );
};

export default TimeCountDown;
