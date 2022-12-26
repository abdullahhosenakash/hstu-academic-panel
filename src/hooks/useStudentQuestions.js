import { useEffect, useState } from 'react';

const useStudentQuestions = (
  dept,
  level,
  semester,
  toggleExamMode = 'old',
  studentId = ''
) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    if (toggleExamMode === 'new') {
      fetch(
        `http://localhost:5000/examQuestions?dept=${dept}&level=${level}&semester=${semester}${
          studentId ? `&studentId=${studentId}` : ''
        }`
      )
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  }, [dept, level, semester, toggleExamMode, studentId]);
  console.log('hook');
  return [questions];
};

export default useStudentQuestions;
