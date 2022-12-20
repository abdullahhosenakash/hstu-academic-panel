import React, { useState } from 'react';
import DeleteModal from '../../Shared/Utilities/DeleteModal';

const AvailableQuestions = (props) => {
  const {
    q,
    index,
    editQuestion,
    editQuestionButton,
    questionToEdit,
    errorMessage,
    setErrorMessage,
    updateQuestionButton,
    deleteQuestion
  } = props;
  const [updatedQuestionText, setUpdatedQuestionText] = useState('');
  const { questionId, question } = q || {};
  console.log(questionToEdit);
  return (
    <tr>
      <td>{index + 1}</td>
      {editQuestion && questionToEdit === index + 1 ? (
        <>
          <td className='relative'>
            <textarea
              name='updatedQuestionField'
              className='textarea bg-white text-lg text-black w-full'
              placeholder='Question'
              defaultValue={question}
              onFocus={() => setErrorMessage('')}
              onChange={(e) => setUpdatedQuestionText(e.target.value)}
            />
            <p className='text-sm p-0 bottom-px text-center text-red-400 absolute inset-x-1/4'>
              {errorMessage}
            </p>
          </td>
          <td>
            <div className='flex gap-2'>
              <button
                className='btn rounded-full btn-primary w-20'
                onClick={(e) => {
                  e.preventDefault();
                  updateQuestionButton(updatedQuestionText, questionId);
                }}
              >
                Update
              </button>
              <button
                className='btn rounded-full btn-primary w-20'
                onClick={(e) => {
                  e.preventDefault();
                  editQuestionButton(!editQuestion);
                }}
              >
                Cancel
              </button>
            </div>
          </td>
        </>
      ) : (
        <>
          <td>{question}</td>
          <td>
            <div className='flex gap-2'>
              <button
                className='btn rounded-full btn-primary w-20'
                onClick={(e) => {
                  e.preventDefault();
                  editQuestionButton(questionId, !editQuestion);
                }}
              >
                Edit
              </button>
              <label
                htmlFor='my-modal-6'
                className='btn rounded-full btn-primary w-20'
              >
                Delete
              </label>
              <DeleteModal
                deleteQuestion={deleteQuestion}
                questionId={questionId}
              />
            </div>
          </td>
        </>
      )}
    </tr>
  );
};

export default AvailableQuestions;
