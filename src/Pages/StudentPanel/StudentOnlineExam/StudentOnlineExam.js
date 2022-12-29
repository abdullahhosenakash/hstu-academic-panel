import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';
import useCurrentTime from '../../../hooks/useCurrentTime';
import TimeCountDown from '../../Shared/Utilities/TimeCountDown';
import ParticipateExam from './ParticipateExam';

const StudentOnlineExam = ({ toggleExamMode }) => {
  const [questions, setQuestions] = useState([]);
  const [questionModified, setQuestionModified] = useState(false);
  const [currentTime] = useCurrentTime();
  const navigate = useNavigate();
  const studentId = '1802102';
  const dept = 'ece';
  const level = '4';
  const semester = 'I';

  useEffect(() => {
    console.log(questionModified);
    fetch(
      `http://localhost:5000/examQuestions?department=${dept}&level=${level}&semester=${semester}&examMode=${toggleExamMode}&studentId=${studentId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setQuestions(data);
        } else {
          setQuestions([]);
        }
      });
  }, [dept, level, semester, toggleExamMode, questionModified]);

  useEffect(() => {
    questions.forEach((question) => {
      if (
        question.examCompleted === false &&
        question.examTimeWithDurationInMilliseconds - currentTime <= 0
      ) {
        const closedQuestion = { examCompleted: true };
        fetch(
          `http://localhost:5000/updateQuestion?questionId=${question._id}`,
          {
            method: 'put',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(closedQuestion)
          }
        )
          .then((res) => res.json())
          .then((data) => setQuestionModified(!questionModified));
      }
    });
  }, [currentTime, questions, questionModified]);

  const participateExam = (_id) => {
    const selectedExam = questions.find((question) => question._id === _id);
    navigate(`/onlineExam/participateExam`, {
      replace: true,
      state: selectedExam
    });
  };

  const viewResult = () => {
    console.log('hh');
  };

  return (
    <div className='pt-2'>
      <div className='overflow-x-auto'>
        <table
          className='table table-zebra lg:w-1/2 mx-auto rounded-full mt-2'
          data-theme='dark'
        >
          {/* Table Head */}
          <thead className='text-center'>
            <tr>
              <th className='w-8'>SL</th>
              <td>Course Code</td>
              <td>Course Teacher</td>
              <th className=''>Exam Title</th>
              <th className=''>Date</th>
              <th className=''>Time</th>
              <th className=''>Duration</th>
              {toggleExamMode === 'new' ? (
                <th className=''>Time Remaining</th>
              ) : (
                <th className=''>Result Status</th>
              )}
              <th className='w-8'>Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className='text-center'>
            {questions.length ? (
              <>
                {questions.map((q, index) => (
                  <tr key={index} className='h-24'>
                    <td>{index + 1}</td>
                    <td>{q.courseCode}</td>
                    <td>{q.courseTeacher}</td>
                    <td>{q.examTitle}</td>
                    <td>{q.examDate}</td>
                    <td>{q.examTime}</td>
                    <td>{q.duration}</td>
                    {toggleExamMode === 'new' ? (
                      <td>
                        {q.examTimeInMilliseconds - currentTime > 0 ? (
                          <span
                            className={
                              q.examTimeInMilliseconds - currentTime < 3600000
                                ? 'text-yellow-400'
                                : ''
                            }
                          >
                            <span className='block text-sm'>
                              Exam will be started in
                            </span>
                            {/* <Countdown
                              className='block'
                              date={
                                Date.now() +
                                (q.examTimeInMilliseconds - currentTime)
                              }
                            /> */}
                            <TimeCountDown
                              deadline={q.examTimeInMilliseconds}
                            />
                          </span>
                        ) : (
                          <span className='text-red-500'>
                            <span className='block text-sm'>
                              Exam has started and <br /> will be closed in
                            </span>
                            {/* <Countdown
                              className='block'
                              date={
                                Date.now() +
                                (q.examTimeWithDurationInMilliseconds -
                                  currentTime)
                              }
                            /> */}
                            <TimeCountDown
                              deadline={q.examTimeWithDurationInMilliseconds}
                            />
                          </span>
                        )}
                      </td>
                    ) : (
                      <td>{q.resultStatus}</td>
                    )}
                    <td>
                      {toggleExamMode === 'new' ? (
                        <button
                          className='btn btn-sm rounded-full btn-primary'
                          disabled={q.examTimeInMilliseconds >= currentTime}
                          onClick={() => participateExam(q._id)}
                        >
                          Participate
                        </button>
                      ) : (
                        <button
                          className='btn btn-sm rounded-full btn-primary'
                          disabled={q.resultStatus === 'not published'}
                          onClick={() => viewResult(q._id)}
                        >
                          View Result
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr></tr>
            )}
          </tbody>
        </table>

        {/* <CQ questions={questions} /> */}
      </div>
    </div>
  );
};

export default StudentOnlineExam;
