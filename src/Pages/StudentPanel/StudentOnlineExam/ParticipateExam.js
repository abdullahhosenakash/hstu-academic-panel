import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CQ from '../../Shared/OnlineExam/CQ';
import LoadingSpinner from '../../Shared/Utilities/LoadingSpinner';

const ParticipateExam = ({ preview = false, testQuestions }) => {
  const {
    state: { selectedExam, studentId },
  } = useLocation();
  const [pageLoading, setPageLoading] = useState(false);
  const navigate = useNavigate();

  const submitFinalAnswer = (e, answersOfQuestions) => {
    e.preventDefault();
    setPageLoading(true);
    const answerToSubmit = { studentId, answersOfQuestions };
    fetch(`http://localhost:5000/updateAnswer?questionId=${selectedExam._id}`, {
      method: 'put',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(answerToSubmit),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.result?.acknowledged) {
          toast.success('Answers submitted');
          e.target.reset();
          setPageLoading(false);
          navigate('/onlineExam', {
            replace: true,
          });
        } else if (data.message) {
          toast.error('Answer already submitted');
        }
      });
    setPageLoading(false);
  };

  if (pageLoading) {
    return <LoadingSpinner />;
  }

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
