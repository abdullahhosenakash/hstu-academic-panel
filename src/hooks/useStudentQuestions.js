import { useEffect, useState } from 'react';

const useStudentQuestions = (
  dept,
  level,
  semester,
  questionMode = 'old',
  studentId = ''
) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    if (questionMode === 'new') {
      fetch(
        `http://localhost:5000/examQuestions?dept=${dept}&level=${level}&semester=${semester}${
          studentId ? `&studentId=${studentId}` : ''
        }`
      )
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  }, [dept, level, semester, questionMode, studentId]);
  return [questions];
};

export default useStudentQuestions;
