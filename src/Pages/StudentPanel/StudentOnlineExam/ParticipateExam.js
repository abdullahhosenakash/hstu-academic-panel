import React from 'react';
import { useLocation } from 'react-router-dom';
import CQ from '../../Shared/OnlineExam/CQ';

const ParticipateExam = () => {
  const {
    state: { _id, examType, questions }
  } = useLocation();
  //   const selectedExam=
  console.log(questions);
  return (
    <div>
      <CQ questions={questions}></CQ>
    </div>
  );
};

export default ParticipateExam;
