import React, { useEffect, useState } from 'react';
import useStudentQuestions from '../../../hooks/useStudentQuestions';
import CQ from '../../Shared/OnlineExam/CQ';

const StudentOnlineExam = ({ toggleExamMode }) => {
  const [questions, setQuestions] = useState([]);
  const studentId = '1802103';
  const dept = 'ece';
  const level = '1';
  const semester = 'I';

  useEffect(() => {
    fetch(
      `http://localhost:5000/examQuestions?dept=${dept}&level=${level}&semester=${semester}&examMode=${toggleExamMode}`
    );
  }, [dept, level, semester, toggleExamMode]);
  console.log(questions);
  return (
    <div>
      <CQ questions={questions} />
    </div>
  );
};

export default StudentOnlineExam;
