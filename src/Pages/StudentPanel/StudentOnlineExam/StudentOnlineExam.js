import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

const StudentOnlineExam = ({ toggleExamMode }) => {
  const [questions, setQuestions] = useState([]);
  const studentId = '1802102';
  const dept = 'ece';
  const level = '4';
  const semester = 'I';

  useEffect(() => {
    fetch(
      `http://localhost:5000/examQuestions?department=${dept}&level=${level}&semester=${semester}&examMode=${toggleExamMode}&studentId=${studentId}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data) {
          setQuestions(data);
        } else {
          setQuestions([]);
        }
      });
  }, [dept, level, semester, toggleExamMode]);

  return (
    <div className=''>
      <div className='overflow-x-auto'>
        <table
          className='table table-zebra lg:w-1/2 mx-auto rounded-full mt-2 ov'
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
              <th className=''>Time Remaining</th>
              <th className='w-8'>Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody className='text-center'>
            {questions.length ? (
              <>
                {questions.map((q, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{q.courseCode}</td>
                    <td>{q.courseTeacher}</td>
                    <td>{q.examTitle}</td>
                    <td>{q.examDate}</td>
                    <td>{q.examTime}</td>
                    <td>{q.duration}</td>
                    <td>
                      <Countdown
                        date={
                          Date.now() +
                          (new Date(`${q.examDate} ${q.examTime}`).getTime() -
                            new Date().getTime())
                        }
                      />
                    </td>
                    <td>
                      <button
                        className='btn btn-sm rounded-full btn-primary'
                        // onClick={(e)=>}
                      >
                        Participate
                      </button>
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
