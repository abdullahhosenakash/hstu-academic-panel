import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const recoverPassword = (e) => {
    e.preventDefault();
    toast.success('Password recovery email sent');
  };
  const userLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
  };
  return (
    <div>
      <h1 className='text-3xl font-bold text-center mt-3'>Login now!</h1>
      <form onSubmit={(e) => userLogin(e)}>
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
              <label className='label'>
                <span className='label-text-alt'>
                  Forgot password?{' '}
                  <button
                    className='text-primary'
                    onClick={(e) => recoverPassword(e)}
                  >
                    recover now
                  </button>
                </span>
              </label>
            </div>
            <div className='form-control mt-6'>
              <button className='btn btn-primary' type='submit'>
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
