import React, { useState } from 'react';

const TeacherOnlineExam = ({ toggleExamMode }) => {
  const [examType, setExamType] = useState('cq');
  const [questions, setQuestions] = useState([]);

  const questionSubmit = (e) => {
    e.preventDefault();
    const questionText = e.target.questionField.value;
    const newQuestion = {
      id: questions.length + 1,
      question: questionText
    };
    setQuestions([...questions, newQuestion]);
    e.target.reset();
  };
  console.log(questions);
  // console.log(questions.length);
  return (
    <div>
      <div className='flex justify-center gap-2 py-2'>
        <button
          className={`btn btn-sm rounded-full btn-primary w-16 ${
            examType === 'cq' && 'btn-disabled'
          }`}
          onClick={() => setExamType('cq')}
        >
          CQ
        </button>
        <button
          className={`btn btn-sm rounded-full btn-primary w-16 ${
            examType === 'mcq' && 'btn-disabled'
          }`}
          onClick={() => setExamType('mcq')}
        >
          MCQ
        </button>
      </div>
      {/* Table */}
      <div className='overflow-x-auto w-full'>
        <form onSubmit={(e) => questionSubmit(e)}>
          <table
            className='table table-zebra w-1/2 mx-auto rounded-full'
            data-theme='dark'
          >
            {/* Table Head */}
            <thead className='text-center'>
              <tr>
                <th className='w-8'>SL</th>
                <th className=''>Question</th>
                <th className='w-8'>Action</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className='text-center'>
              {questions.length ? (
                questions.map((q, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{q.question}</td>
                    <td>
                      <button className='btn rounded-full btn-primary w-20'>
                        Edit
                      </button>
                      <button className='btn hidden rounded-full btn-primary w-20'>
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className='hidden'>
                  <td>2</td>
                  <td>
                    <textarea
                      name='questionFiel'
                      className='textarea bg-white text-base text-black w-full'
                      placeholder='Question'
                    />
                  </td>
                  <td>
                    <button
                      type='submit'
                      className='btn rounded-full btn-primary'
                    >
                      Add
                    </button>
                  </td>
                </tr>
              )}
              <tr>
                <td>{questions.length + 1}</td>
                <td>
                  <textarea
                    name='questionField'
                    className='textarea bg-white text-base text-black w-full'
                    placeholder='Question'
                    required
                  />
                </td>
                <td>
                  <button
                    type='submit'
                    className='btn rounded-full btn-primary w-20'
                  >
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default TeacherOnlineExam;
