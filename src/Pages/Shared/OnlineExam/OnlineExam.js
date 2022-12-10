import React from 'react';

const OnlineExam = () => {
  const role = 'teacher';
  return (
    <div className='px-2'>
      <h2 className='text-center py-5 text-3xl text-white'>Online Exam</h2>
      <div className='flex lg:flex-row flex-col gap-3 justify-center'>
        <button className='btn btn-primary'>Launch New Exam</button>
        <button className='btn btn-primary'>View Existing Exams</button>
      </div>
    </div>
  );
};

export default OnlineExam;
