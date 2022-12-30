import React, { useEffect, useState } from 'react';
import useCurrentTime from '../../../hooks/useCurrentTime';
import TimeCountDown from '../Utilities/TimeCountDown';

const CQ = ({
  testQuestions = [],
  selectedExam,
  preview = false,
  submitAnswers
}) => {
  const {
    _id,
    degree,
    level,
    semester,
    examTitle,
    courseTitle,
    courseCode,
    duration,
    questions,
    examTimeWithDurationInMilliseconds
  } = selectedExam || {};
  const [currentTime] = useCurrentTime();
  const [timeUp, setTimeUp] = useState(false);
  const [warning, setWarning] = useState(false);
  const [answers, setAnswers] = useState([]);

  // console.log(timeUp);

  useEffect(() => {
    const dueMinutes = new Date(
      examTimeWithDurationInMilliseconds - currentTime
    ).getMinutes();
    const dueSeconds = new Date(
      examTimeWithDurationInMilliseconds - currentTime
    ).getSeconds();
    const dueTime = dueMinutes * 60 + dueSeconds;
    // console.log(dueTime);
    if (dueTime <= 0) {
      setTimeUp(true);
    } else if (dueTime < 300) {
      setWarning(true);
    }
  }, [currentTime, examTimeWithDurationInMilliseconds]);

  // console.log(answers);

  return (
    <div className='flex justify-center pb-2'>
      <div className='card lg:w-[40rem]'>
        {!preview ? (
          <div className='sticky inset-x-0 top-0 pb-2 bg-white text-gray-800'>
            <h2 className='text-3xl text-center'>Participate Exam</h2>
            <div
              className={`flex justify-center ${warning ? 'text-red-700' : ''}`}
            >
              <span className='pr-3'>Exam will be closed in</span>
              <TimeCountDown
                deadline={examTimeWithDurationInMilliseconds}
                examStarted={true}
                timeUp={timeUp}
              />
            </div>
          </div>
        ) : (
          ''
        )}
        <div className='rounded-3xl' data-theme='dark'>
          {!preview ? (
            <div className='text-center pt-2'>
              <h3 className='text-lg'>
                {degree} <span className='pl-4'>Level: {level}</span>
                <span className='pl-2'> Semester: {semester}</span>
              </h3>
              <p>
                Course Code: {courseCode}{' '}
                <span className='pl-3'>Course Title: {courseTitle}</span>
              </p>
              <p>
                {examTitle} {new Date().getFullYear()}
              </p>
            </div>
          ) : (
            ''
          )}
          <form onSubmit={(e) => submitAnswers(e, answers)}>
            <div className='card-body'>
              {(preview ? testQuestions : questions)?.map((q, index) => (
                <div className='form-control' key={index}>
                  <label className='label'>
                    <span className='label-text text-lg text-white'>
                      {q.question}
                    </span>
                  </label>
                  <textarea
                    name='answerToQuestion'
                    className='textarea textarea-bordered bg-white text-lg text-black w-full h-48'
                    readOnly={preview || timeUp}
                    placeholder='Type your answer here'
                    required
                    onBlur={(e) => {
                      if (e.target.value) {
                        const availableQuestion = answers.find(
                          (a) => a.questionId === q.questionId
                        );
                        if (availableQuestion) {
                          availableQuestion.answer = e.target.value;
                        } else {
                          const answer = {
                            questionId: q.questionId,
                            question: q.question,
                            answer: e.target.value
                          };
                          setAnswers([...answers, answer]);
                        }
                      }
                    }}
                  />
                </div>
              ))}

              <div className='form-control mt-6'>
                <button
                  className='btn btn-primary lg:w-1/2 mx-auto'
                  type='submit'
                  disabled={preview || timeUp}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CQ;
