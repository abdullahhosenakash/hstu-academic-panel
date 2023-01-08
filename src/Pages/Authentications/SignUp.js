import React, { useState } from 'react';
import auth from '../../firebase.config';
import {
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import LoadingSpinner from '../Shared/Utilities/LoadingSpinner';
import { signOut } from 'firebase/auth';

const SignUp = () => {
  const [userMode, setUserMode] = useState('student');
  const [userExists, setUserExists] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [sendEmailVerification, sending, verificationError] =
    useSendEmailVerification(auth);

  const userSignUp = (e, signUpMethod) => {
    e.preventDefault();
    if (signUpMethod === 'google') {
      signInWithGoogle();
    } else {
      const email = e.target.email.value;
      const password = e.target.password.value;
      createUserWithEmailAndPassword(email, password);
    }
  };

  return (
    <div>
      {(loading || googleLoading || sending) && <LoadingSpinner />}
      <button className='btn' onClick={() => signOut(auth)}>
        sign out
      </button>
      <h1 className='text-3xl font-bold text-center mt-3'>Sign Up now!</h1>
      <div className='flex  gap-3 justify-center pt-2'>
        <button
          className={`btn btn-sm rounded-full btn-primary w-42 lg:uppercase normal-case  ${
            userMode === 'student' ? 'btn-disabled' : ''
          }`}
          onClick={() => setUserMode('student')}
        >
          Student
        </button>
        <button
          className={`btn btn-sm rounded-full btn-primary w-42 lg:uppercase normal-case ${
            userMode === 'teacher' ? 'btn-disabled' : ''
          }`}
          onClick={() => setUserMode('teacher')}
        >
          Teacher
          {/* {role === 'student' ? 'Participate' : 'Launch'} New Exam */}
        </button>
      </div>
      <form onSubmit={(e) => userSignUp(e, 'emailPassword')}>
        <div className='card w-96 mx-auto shadow-2xl bg-base-100'>
          <div className='card-body pt-1'>
            {/* Student ID  */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>
                  User ID {'(Provided by admin)'}
                </span>
              </label>
              <input
                type='text'
                name='userId'
                placeholder='Enter 8 digit User ID'
                className='input input-primary'
                required
                onFocus={() => setErrorMessage('')}
                onBlur={(e) => setUserId(e.target.value)}
                onChange={(e) => {
                  if (e.target.value.length === 8) {
                    fetch(
                      `http://localhost:5000/findUser?userId=${e.target.value}&userMode=${userMode}`
                    )
                      .then((res) => res.json())
                      .then((data) => {
                        if (data.result === 1) {
                          setUserExists(true);
                          setErrorMessage('User Exists');
                        } else if (data.result === 0) {
                          setUserExists(false);
                          setErrorMessage('');
                        } else {
                          setUserExists(true);
                          setErrorMessage('Wrong User ID');
                        }
                      });
                  }
                }}
              />
              {userExists && errorMessage ? (
                <span className='text-sm text-center text-red-500 pt-1'>
                  {errorMessage}
                </span>
              ) : (
                ''
              )}
            </div>

            {/* divider */}
            <div className='flex flex-col w-full border-opacity-50'>
              <button
                className='btn btn-primary'
                disabled={userExists}
                onClick={(e) => {
                  e.preventDefault();
                  userSignUp(e, 'google');
                }}
              >
                Sign Up with Google
              </button>
              <div className='divider'>OR</div>
              {/* <div className='grid h-20 card bg-base-300 rounded-box place-items-center'>
                content
              </div> */}
              {/* Email */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  type='email'
                  name='email'
                  placeholder='Enter your email'
                  className='input input-primary'
                  required
                  disabled={userExists}
                />
              </div>
              {/* Password */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  type='password'
                  name='password'
                  placeholder='Enter your password'
                  className='input input-primary'
                  required
                  disabled={userExists}
                />
              </div>
              {error ? (
                <span className='text-sm text-center text-red-500 pt-1'>
                  {error.message}
                </span>
              ) : (
                ''
              )}
              <div className='form-control mt-6'>
                <button
                  className='btn btn-primary'
                  type='submit'
                  disabled={userExists}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
