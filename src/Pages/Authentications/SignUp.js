import React from 'react';

const SignUp = () => {
  const userSignUp = (e) => {
    e.preventDefault();
    console.log('signup');
  };

  return (
    <div>
      <h1 className='text-3xl font-bold text-center mt-3'>Sign Up now!</h1>
      <form onSubmit={(e) => userSignUp(e)}>
        <div className='card w-96 mx-auto shadow-2xl bg-base-100'>
          <div className='card-body'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                type='email'
                name='email'
                placeholder='Enter your email'
                className='input input-bordered'
                required
              />
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Password</span>
              </label>
              <input
                type='password'
                name='password'
                placeholder='Enter your password'
                className='input input-bordered'
                required
              />
            </div>
            <div className='form-control mt-6'>
              <button className='btn btn-primary' type='submit'>
                Sign Up
              </button>
            </div>
            <div className='divider'>OR</div>
            <div className='form-control'>
              <button className='btn btn-primary' type='submit'>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
