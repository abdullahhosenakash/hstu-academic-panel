import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EvaluateAnswers = () => {
  const {
    state: { selectedExam }
  } = useLocation();
  const { _id, answers, questions, examMarks } = selectedExam || {};
  const [studentAnswers, setStudentAnswers] = useState({});
  const [totalMark, setTotalMark] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [pageLoading, setPageLoading] = useState(false);
  const { studentId, answersOfQuestions } = studentAnswers;
  // console.log(examMarks);

  const evaluateButton = (studentId) => {
    const selectedStudent = answers.find(
      (answer) => answer.studentId === studentId
    );
    setStudentAnswers(selectedStudent);
  };
  // console.log(totalMark);

  const submitMarks = (e) => {
    e.preventDefault();
    let givenMarks = 0;
    totalMark.forEach((m) => (givenMarks += parseInt(m.mark)));
    if (givenMarks > examMarks) {
      setErrorMessage(
        `Given marks(${givenMarks}) exceeded exam marks(${examMarks})!`
      );
    } else {
      setPageLoading(true);
      fetch(
        `https://hstu-online-services-server.onrender.com/evaluateAnswers?questionId=${_id}`,
        {
          method: 'put',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ studentId, givenMarks })
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success('Mark updated');
            e.target.reset();
            // setStudentAnswers({});
            // setQuestionModified(!questionModified);
          }
        });
    }
  };

  return (
    <div className='pt-2'>
      <h2 className='text-3xl text-center'>Evaluate Answers</h2>
      <div className=''>
        <div className='flex flex-col lg:flex-row justify-around'>
          <div className='p-1 border-2 border-primary rounded-lg'>
            <div className='h-[32rem] overflow-y-scroll'>
              <table
                className='table table-zebra rounded-full mx-auto'
                data-theme='dar'
              >
                {/* Table Head */}
                <thead className='text-center'>
                  <tr>
                    <th className='w-8'>SL</th>
                    <th>Student ID</th>
                    <th>Obtained Mark</th>
                    <th className='w-8'>Action</th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody className='text-center'>
                  {answers.length ? (
                    <>
                      {answers.map((q, index) => (
                        <tr key={index} className=''>
                          <td>{index + 1}</td>
                          <td>{q.studentId}</td>
                          <td>
                            {q.obtainedMark
                              ? q.obtainedMark
                              : 'Not evaluated yet'}
                          </td>
                          <td>
                            <button
                              className='btn btn-sm rounded-full btn-primary'
                              disabled={q.evaluated}
                              onClick={() => evaluateButton(q.studentId)}
                            >
                              Evaluate
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
            </div>
          </div>

          <div className='w-1/2 border-2 border-primary rounded-lg'>
            <h4 className='text-xl text-center rounded-t-md py-2 bg-[#f2f2f2]'>
              Student ID: {studentId}
            </h4>
            <div className='h-[30rem] overflow-y-scroll pb-5'>
              <form onSubmit={(e) => submitMarks(e)}>
                <div className='w-full mx-auto mt-2'>
                  <div className=''>
                    {answersOfQuestions?.map((answer, index) => (
                      <div className='m-1' key={index}>
                        {questions?.map((question, index) => {
                          if (question.questionId === answer.questionId) {
                            // console.log(question.question);
                            return (
                              <div
                                key={index}
                                className='border border-primary rounded-lg'
                              >
                                <div className='bg-slate-100 rounded-t-lg mb-2 p-1'>
                                  <div className='font-bold'>Question: </div>
                                  {question.question}
                                </div>
                                <div className='p-1'>
                                  <div className='font-bold'>Answer: </div>
                                  {answer.answer}
                                </div>
                                <div className='flex justify-center items-center bg-slate-100 rounded-b-lg'>
                                  <label className='label pr-2'>Mark: </label>
                                  <input
                                    type='number'
                                    name=''
                                    placeholder='Enter mark'
                                    className='input input-sm input-primary w-24'
                                    min={0}
                                    required
                                    onFocus={() => setErrorMessage('')}
                                    onBlur={(e) => {
                                      const availableMark = totalMark.find(
                                        (m) =>
                                          m.questionId === question.questionId
                                      );
                                      if (availableMark) {
                                        availableMark.mark = e.target.value;
                                      } else {
                                        setTotalMark([
                                          ...totalMark,
                                          {
                                            questionId: question.questionId,
                                            mark: e.target.value
                                          }
                                        ]);
                                      }
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          }
                        })}
                      </div>
                    ))}
                  </div>
                  {studentAnswers.studentId ? (
                    <div className='flex flex-col items-center '>
                      {errorMessage ? (
                        <p className='text-red-600 text-sm'>{errorMessage}</p>
                      ) : (
                        ''
                      )}
                      <button
                        className='btn btn-sm btn-primary rounded-full px-4'
                        type='submit'
                      >
                        Submit Marks
                      </button>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className='overflow-x-auto'></div>
    </div>
  );
};

export default EvaluateAnswers;
