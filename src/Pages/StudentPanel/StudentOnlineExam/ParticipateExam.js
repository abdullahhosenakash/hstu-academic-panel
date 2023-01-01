import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CQ from '../../Shared/OnlineExam/CQ';
import TimeCountDown from '../../Shared/Utilities/TimeCountDown';

const ParticipateExam = ({ preview = false, testQuestions }) => {
  const {
    state: { selectedExam, studentId }
  } = useLocation();
  const navigate = useNavigate();

  const submitFinalAnswer = (e, answers) => {
    e.preventDefault();
    const answerToSubmit = { studentId, answers };
    fetch(`http://localhost:5000/updateAnswer?questionId=${selectedExam._id}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(answerToSubmit)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.result?.acknowledged) {
          toast.success('Answers submitted');
          e.target.reset();
          navigate('/onlineExam', {
            replace: true
          });
        } else if (data.message) {
          toast.error('Answer already submitted');
        }
      });
  };

  return (
    <div>
      <CQ
        selectedExam={selectedExam}
        submitFinalAnswer={submitFinalAnswer}
      ></CQ>
    </div>
  );
};

export default ParticipateExam;
