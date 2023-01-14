import React from 'react';
import { useLocation } from 'react-router-dom';

const ExamResult = () => {
  const location = useLocation();
  const studentId = location.state;
  console.log(location);
  return (
    <div>
      <h2 className='text-3xl text-center'>Exam Result for: {studentId}</h2>
    </div>
  );
};

export default ExamResult;
