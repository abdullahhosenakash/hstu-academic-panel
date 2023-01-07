import React from 'react';

const DeleteModal = ({ deleteQuestion, questionId }) => {
  return (
    <div>
      {/* The button to open modal */}
      {/* <label htmlFor='my-modal-6' className='btn'>
        open modal
      </label> */}

      {/* Put this part before </body> tag */}
      <input type='checkbox' id='my-modal-6' className='modal-toggle' />
      <div className='modal modal-bottom sm:modal-middle'>
        <div className='modal-box bg-indigo-200'>
          <h3 className='font-bold text-lg text-black'>Delete the question?</h3>
          {/* <p className='py-4'>
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p> */}
          <div className='modal-action'>
            <button
              className='btn btn-primary rounded-full w-20'
              onClick={() => deleteQuestion(questionId)}
            >
              Delete
            </button>
            <label
              htmlFor='my-modal-6'
              className='btn btn-primary rounded-full'
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
