import React from 'react';
import { useLocation } from 'react-router-dom';
import CQ from '../../Shared/OnlineExam/CQ';

const ParticipateExam = () => {
  const { state: selectedExam } = useLocation();
  //   const selectedExam=
  return (
    <div>
      <h2 className='text-3xl text-center'>Participate Exam</h2>
      <CQ selectedExam={selectedExam}></CQ>
    </div>
  );
};

export default ParticipateExam;
