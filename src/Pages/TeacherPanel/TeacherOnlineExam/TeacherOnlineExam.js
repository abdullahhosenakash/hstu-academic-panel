import React, { useState } from 'react';
import CQ from '../../Shared/OnlineExam/CQ';
import AvailableQuestions from './AvailableQuestions';

const TeacherOnlineExam = ({ toggleExamMode }) => {
  const [examType, setExamType] = useState('cq');
  const [questions, setQuestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editQuestion, setEditQuestion] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState('');
  const [previewQuestion, setPreviewQuestion] = useState(false);

  const questionSubmit = (e) => {
    e.preventDefault();
    const questionText = e.target.questionField.value;
    if (questionText) {
      const newQuestion = {
        questionId: questions.length + 1,
        question: questionText
      };
      setQuestions([...questions, newQuestion]);
      e.target.reset();
    } else {
      setErrorMessage('Please write the question first');
    }
  };

  const updateQuestionButton = (updatedQuestionText, questionId) => {
    if (updatedQuestionText) {
      const updatedQuestions = questions.map((q) => {
        if (q.questionId !== questionId) {
          return q;
        } else {
          q.question = updatedQuestionText;
          return q;
        }
      });
      setQuestions(updatedQuestions);
    }
    setEditQuestion(!editQuestion);
  };

  const editQuestionButton = (questionId, isEditQuestion) => {
    setQuestionToEdit(questionId);
    setEditQuestion(isEditQuestion);
  };

  const deleteQuestion = (questionId) => {
    const restQuestions = questions.filter((q) => q.questionId !== questionId);
    setQuestions(restQuestions);
  };

  return (
    <div>
      {toggleExamMode === 'new' && (
        <>
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
          {/* Questions */}
          <div className='overflow-x-auto w-full'>
            {previewQuestion ? (
              <CQ questions={questions} preview={true} />
            ) : (
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
                      <>
                        {questions.map((q, index) => (
                          <AvailableQuestions
                            q={q}
                            index={index}
                            key={index}
                            editQuestion={editQuestion}
                            editQuestionButton={editQuestionButton}
                            questionToEdit={questionToEdit}
                            errorMessage={errorMessage}
                            setErrorMessage={setErrorMessage}
                            updateQuestionButton={updateQuestionButton}
                            deleteQuestion={deleteQuestion}
                          />
                        ))}
                      </>
                    ) : (
                      <tr></tr>
                    )}
                    {/* add new question */}
                    {!editQuestion && (
                      <tr>
                        <td>{questions.length + 1}</td>
                        <td className='relative'>
                          <textarea
                            name='questionField'
                            className='textarea bg-white text-lg text-black w-full'
                            placeholder='Question'
                            onFocus={() => setErrorMessage('')}
                          />
                          <p className='text-sm p-0 bottom-px text-center text-red-400 absolute inset-x-1/4'>
                            {errorMessage}
                          </p>
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
                    )}
                  </tbody>
                </table>
              </form>
            )}
            {questions.length && (
              <p className='text-xl text-center pt-2'>
                Done making questions?
                <span
                  className='text-primary pl-2 cursor-pointer'
                  onClick={() => setPreviewQuestion(true)}
                >
                  see preview
                </span>
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TeacherOnlineExam;
