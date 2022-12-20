import React from 'react';

const CQ = ({ questions, preview = false }) => {
  const submitAnswers = (e) => {
    e.preventDefault();
    console.log('a');
  };
  return (
    <div className='hero mt-2'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <div
          className='card flex-shrink-0 w-[40rem] shadow-[0_10px_60px_-10px_rgba(0,0,0,0.3)] bg-base-100'
          data-theme='dark'
        >
          <form onSubmit={(e) => submitAnswers(e)}>
            <div className='card-body'>
              {/* <form onSubmit={() => console.log('ss')}> */}
              {questions.map((q, index) => (
                <div className='form-control' key={index}>
                  <label className='label'>
                    <span className='label-text text-lg text-white'>
                      {q.question}
                    </span>
                  </label>
                  <textarea
                    name={`answerToQuestion${q.questionId}`}
                    className='textarea textarea-bordered bg-white text-lg text-black w-full'
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
                  className='btn btn-primary w-1/2 mx-auto'
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
