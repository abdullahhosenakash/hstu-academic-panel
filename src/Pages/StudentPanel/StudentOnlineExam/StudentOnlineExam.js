import React, { useEffect } from 'react';
import useStudentQuestions from '../../../hooks/useStudentQuestions';
import CQ from '../../Shared/OnlineExam/CQ';

const StudentOnlineExam = ({ toggleExamMode }) => {
  const studentId = '1802103';
  const dept = 'ece';
  const level = '1';
  const semester = 'I';
  const [questions] = useStudentQuestions(
    dept,
    level,
    semester,
    toggleExamMode,
    studentId
  );
  // const []
  // useEffect();
  console.log(questions);
  return (
    <div>
      <CQ questions={questions} />
    </div>
  );
};

export default StudentOnlineExam;
