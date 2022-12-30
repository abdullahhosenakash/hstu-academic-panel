import React from 'react';
import { useLocation } from 'react-router-dom';
import CQ from '../../Shared/OnlineExam/CQ';
import TimeCountDown from '../../Shared/Utilities/TimeCountDown';

const ParticipateExam = ({ preview = false, testQuestions }) => {
  const {
    state: { selectedExam, studentId }
  } = useLocation();
  //   const selectedExam=
  const submitAnswers = (e, answers) => {
    e.preventDefault();
    const answerToSubmit = { studentId, answers };
    fetch(
      `http://localhost:5000/updateQuestion?questionId=${selectedExam._id}`,
      {
        method: 'put',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ answerToSubmit })
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      {/* <div className='sticky inset-x-0 top-0 bg-green-500'>
        <h2 className='text-3xl text-center'>Participate Exam</h2>
        <div className='flex justify-center'>
          <TimeCountDown
            deadline={selectedExam.examTimeWithDurationInMilliseconds}
          />
        </div>
      </div> */}
      <CQ selectedExam={selectedExam} submitAnswers={submitAnswers}></CQ>
    </div>
  );
};

export default ParticipateExam;
