import React from 'react';
import { useNavigate } from 'react-router-dom';

const OldExams = ({ oldQuestions }) => {
  const navigate = useNavigate();
  // console.log(oldQuestions);

  // const evaluateAnswers = (questionId) => {
  //   navigate(`evaluateAnswers`, {
  //     replace: true,
  //     state: { questionId }
  //   });
  // };

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
              <th>Faculty</th>
              <th>Dept</th>
              <td>Course Code</td>
              <td>Course Title</td>
              <th>Exam Title</th>
              <th>Date</th>
              <th>Time</th>
              <th>Duration</th>
              <th>Result Status</th>
              <th className='w-8'>Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className='text-center'>
            {oldQuestions.length ? (
              <>
                {oldQuestions.map((q, index) => (
                  <tr key={index} className=''>
                    <td>{index + 1}</td>
                    <td>{q.faculty}</td>
                    <td>{q.department}</td>
                    <td>{q.courseCode}</td>
                    <td>{q.courseTitle}</td>
                    <td>{q.examTitle}</td>
                    <td>{q.examDate}</td>
                    <td>{q.examTime}</td>
                    <td>{q.duration}</td>
                    <td>{q.resultStatus}</td>
                    <td>
                      <button
                        className='btn btn-sm rounded-full btn-primary w-[10.5rem]'
                        onClick={() => {
                          navigate(`evaluateAnswers`, {
                            replace: true,
                            state: { questionId: q._id }
                          });
                        }}
                        disabled={
                          !q.examCompleted || q.resultStatus === 'published'
                        }
                      >
                        {q.resultStatus === 'published'
                          ? 'Evaluated'
                          : 'Evaluate Answers'}
                      </button>
                      {!q.examCompleted ? (
                        <span className='block text-sm text-warning'>
                          Exam not completed yet
                        </span>
                      ) : (
                        ''
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
      </div>
    </div>
  );
};

export default OldExams;
