import { useEffect, useState } from 'react';

const useMaxDate = (year, month, date) => {
  const [maxDate, setMaxDate] = useState('');
  useEffect(() => {
    // if 31 day months
    if (
      month === 1 ||
      month === 3 ||
      month === 5 ||
      month === 7 ||
      month === 9 ||
      month === 11
    ) {
      if (date < 28) setMaxDate(`${year}-${month}-${date + 5}T22:00`);
      else if (date === 28) setMaxDate(`${year}-${month + 1}-01T22:00`);
      else if (date === 29) setMaxDate(`${year}-${month + 1}-02T22:00`);
      else if (date === 30) setMaxDate(`${year}-${month + 1}-03T22:00`);
      else if (date === 31) setMaxDate(`${year}-${month + 1}-04T22:00`);
      else setMaxDate(`${year}-${month + 1}-05T22:00`);
    }
    // if february
    else if (month === 2) {
      // if leap year
      if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
        if (date < 26) setMaxDate(`${year}-${month}-${date + 5}T22:00`);
        else if (date === 26) setMaxDate(`${year}-${month + 1}-01T22:00`);
        else if (date === 27) setMaxDate(`${year}-${month + 1}-02T22:00`);
        else if (date === 28) setMaxDate(`${year}-${month + 1}-03T22:00`);
        else setMaxDate(`${year}-${month + 1}-04T22:00`);
      }
      // if not leap year
      else {
        if (date < 25) setMaxDate(`${year}-${month}-${date + 5}T22:00`);
        else if (date === 25) setMaxDate(`${year}-${month + 1}-01T22:00`);
        else if (date === 26) setMaxDate(`${year}-${month + 1}-02T22:00`);
        else if (date === 27) setMaxDate(`${year}-${month + 1}-03T22:00`);
        else setMaxDate(`${year}-${month + 1}-04T22:00`);
      }
    }
    // if december
    else if (month === 12) {
      if (date < 27) setMaxDate(`${year}-${month}-${date + 5}T22:00`);
      else if (date === 27) setMaxDate(`${year + 1}-01-01T22:00`);
      else if (date === 28) setMaxDate(`${year + 1}-01-02T22:00`);
      else if (date === 29) setMaxDate(`${year + 1}-01-03T22:00`);
      else setMaxDate(`${year + 1}-01-04T22:00`);
    }
    // if 30 days month
    else {
      if (date < 27) setMaxDate(`${year}-${month}-${date + 5}T22:00`);
      else if (date === 27) setMaxDate(`${year}-${month + 1}-01T22:00`);
      else if (date === 28) setMaxDate(`${year}-${month + 1}-02T22:00`);
      else if (date === 29) setMaxDate(`${year}-${month + 1}-03T22:00`);
      else setMaxDate(`${year}-${month + 1}-04T22:00`);
    }
  }, [year, month, date]);
  return [maxDate];
};

export default useMaxDate;
