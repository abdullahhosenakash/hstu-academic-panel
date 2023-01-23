import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCurrentTime from '../../../hooks/useCurrentTime';
import LoadingSpinner from '../../Shared/Utilities/LoadingSpinner';
import TimeCountDown from '../../Shared/Utilities/TimeCountDown';

const StudentOnlineExam = () => {
  const [questions, setQuestions] = useState([]);
  const [questionModified, setQuestionModified] = useState(false);
  const [currentTime] = useCurrentTime();
  const [pageLoading, setPageLoading] = useState(false);
  const navigate = useNavigate();
  const [toggleExamMode, setToggleExamMode] = useState('old');
  const studentId = '1802121';
  const dept = 'ece';
  const level = '4';
  const semester = 'I';

  useEffect(() => {
    setPageLoading(true);
    fetch(
      `https://hstu-online-services-server.onrender.com/examQuestions?department=${dept}&level=${level}&semester=${semester}&examMode=${toggleExamMode}&studentId=${studentId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setQuestions(data);
          setPageLoading(false);
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
          `https://hstu-online-services-server.onrender.com/updateQuestion?questionId=${question._id}`,
          {
            method: 'put',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(closedQuestion)
          }
        )
          .then((res) => res.json())
          .then(() => setQuestionModified(!questionModified));
      }
    });
  }, [currentTime, questions, questionModified]);

  const participateExam = (_id) => {
    const selectedExam = questions.find((question) => question._id === _id);
    navigate(`/studentOnlineExam/participateExam`, {
      replace: true,
      state: { selectedExam, studentId }
    });
  };

  if (pageLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='pt-2'>
      <div className='flex  gap-3 justify-center'>
        <button
          className={`btn btn-sm rounded-full btn-primary w-42 lg:uppercase normal-case  ${
            toggleExamMode === 'old' && 'btn-disabled'
          }`}
          onClick={() => setToggleExamMode('old')}
        >
          View Existing Exams
        </button>
        <button
          className={`btn btn-sm rounded-full btn-primary w-42 lg:uppercase normal-case ${
            toggleExamMode === 'new' && 'btn-disabled'
          }`}
          onClick={() => setToggleExamMode('new')}
        >
          Participate New Exam
        </button>
      </div>

      {questions.length ? (
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
                <th>Course Teacher</th>
                <th className=''>Exam Title</th>
                <th className=''>Date</th>
                {toggleExamMode === 'new' ? (
                  <>
                    <th className=''>Time</th>
                    <th className=''>Duration</th>
                    <th className=''>Time Remaining</th>
                    <th className='w-8'>Action</th>
                  </>
                ) : (
                  <th className=''>Obtained Mark</th>
                )}
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
                      {toggleExamMode === 'new' ? (
                        <>
                          <td>{q.examTime}</td>
                          <td>{q.duration}</td>
                          <td>
                            {q.examTimeInMilliseconds - currentTime > 0 ? (
                              <span
                                className={
                                  q.examTimeInMilliseconds - currentTime <
                                  3600000
                                    ? 'text-warning'
                                    : ''
                                }
                              >
                                <span className='block text-sm'>
                                  Exam will be started in
                                </span>
                                <TimeCountDown
                                  deadline={q.examTimeInMilliseconds}
                                />
                              </span>
                            ) : (
                              <span className='text-red-500'>
                                <span className='block text-sm'>
                                  Exam has started and <br /> will be closed in
                                </span>
                                <TimeCountDown
                                  deadline={
                                    q.examTimeWithDurationInMilliseconds
                                  }
                                />
                              </span>
                            )}
                          </td>
                        </>
                      ) : (
                        <td>
                          {q.obtainedMark ? (
                            <span className='text-sm text-success'>
                              {q.obtainedMark} out of {q.examMarks}
                            </span>
                          ) : (
                            <>
                              {q.resultStatus !== 'published' ? (
                                <span className='text-sm text-warning block'>
                                  Result not published yet
                                </span>
                              ) : (
                                ''
                              )}
                              <span className='text-sm text-red-500'>
                                You didn't participate
                              </span>
                            </>
                          )}
                        </td>
                      )}
                      {toggleExamMode === 'new' ? (
                        <td>
                          <button
                            className='btn btn-sm rounded-full btn-primary'
                            disabled={
                              q.participated ||
                              q.examTimeInMilliseconds >= currentTime
                            }
                            onClick={() => participateExam(q._id)}
                          >
                            Participate
                          </button>
                          {q.participated ? (
                            <span className='block text-warning'>
                              You already participated
                            </span>
                          ) : (
                            ''
                          )}
                        </td>
                      ) : (
                        ''
                      )}
                    </tr>
                  ))}
                </>
              ) : (
                <tr></tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <h4 className='text-2xl text-center pt-3'>No Exam Available</h4>
      )}
    </div>
  );
};

export default StudentOnlineExam;
