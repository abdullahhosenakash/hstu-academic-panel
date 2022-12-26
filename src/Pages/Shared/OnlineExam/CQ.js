import React from 'react';

const CQ = ({ questions, preview = false }) => {
  const submitAnswers = (e) => {
    e.preventDefault();
    console.log('a');
  };
  return (
    <div className='mt-2 flex justify-center'>
      <div className=''>
        <div className='card lg:w-[40rem]' data-theme='dark'>
          <form onSubmit={(e) => submitAnswers(e)}>
            <div className='card-body'>
              {/* <form onSubmit={() => console.log('ss')}> */}
              {questions?.map((q, index) => (
                <div className='form-control' key={index}>
                  <label className='label'>
                    <span className='label-text text-lg text-white'>
                      {q.question}
                    </span>
                  </label>
                  <textarea
                    name={`answerToQuestion${q.questionId}`}
                    className='textarea textarea-bordered bg-white text-lg text-black w-full h-48'
                    readOnly={preview}
                    placeholder='Type your answer here'
                    // disabled={preview}
                    //   defaultValue={question}
                    //   onFocus={() => setErrorMessage('')}
                    //   onChange={(e) => setUpdatedQuestionText(e.target.value)}
                  />
                </div>
              ))}

              <div className='form-control mt-6'>
                <button
                  className='btn btn-primary lg:w-1/2 mx-auto'
                  type='submit'
                  disabled={preview}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CQ;
