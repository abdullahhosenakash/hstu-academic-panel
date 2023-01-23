import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EvaluateAnswers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { questionId } = location.state;
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const { _id, answers, questions, examMarks } = selectedQuestion;
  const [studentAnswer, setStudentAnswer] = useState({});
  const [totalMark, setTotalMark] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [pageLoading, setPageLoading] = useState(false);
  const { studentId, answersOfQuestions } = studentAnswer;
  const [updated, setUpdated] = useState(false);
  // console.log(selectedQuestion);

  useEffect(() => {
    fetch(
      `https://hstu-online-services-server.onrender.com/findQuestion?questionId=${questionId}`
    )
      .then((res) => res.json())
      .then((data) => {
        const unEvaluatedAnswers = data?.answers?.find(
          (answer) => !answer.obtainedMark
        );
        console.log(data);
        if (unEvaluatedAnswers) {
          setSelectedQuestion(data);
        } else {
          fetch(
            `https://hstu-online-services-server.onrender.com/updateQuestion?questionId=${questionId}`,
            {
              method: 'put',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify({ resultStatus: 'published' })
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                setSelectedQuestion({});
                toast.success('Evaluation Completed!');
                navigate('/teacherOnlineExam', { replace: true });
              }
            });
        }
      });
  }, [questionId, updated, navigate]);

  const evaluateButton = (e, studentId) => {
    e.preventDefault();
    const selectedStudent = answers.find(
      (answer) => answer.studentId === studentId
    );
    setStudentAnswer(selectedStudent);
  };

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
            setStudentAnswer({});
            setUpdated(!updated);
          }
        });
    }
  };

  return (
    <div className='pt-2'>
      <h2 className='text-3xl text-center'>Evaluate Answers</h2>
      <div className=''>
        <div className='flex flex-col lg:flex-row justify-around '>
          <div className='p-1 border-2 border-primary rounded-lg mx-2 lg:mx-0'>
            <div className='h-[32rem] overflow-y-scroll'>
              <table className='table table-zebra rounded-full mx-auto'>
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
                  {answers?.length ? (
                    <>
                      {answers.map((q, index) => (
                        <tr key={index} className=''>
                          <td>{index + 1}</td>
                          <td>{q.studentId}</td>
                          <td className='text-sm'>
                            {q.obtainedMark
                              ? q.obtainedMark
                              : 'Not evaluated yet'}
                          </td>
                          <td>
                            <button
                              className='btn btn-sm rounded-full btn-primary'
                              disabled={q.obtainedMark}
                              onClick={(e) => evaluateButton(e, q.studentId)}
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

          <div className='lg:w-1/2 border-2 border-primary rounded-lg m-2 lg:m-0'>
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
                                    onWheel={(e) => e.target.blur()}
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
                          return '';
                        })}
                      </div>
                    ))}
                  </div>
                  {studentAnswer.studentId ? (
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
