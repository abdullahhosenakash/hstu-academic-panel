import React, { useEffect, useState } from 'react';
import auth from '../../firebase.config';
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
  useSendPasswordResetEmail,
  useSignInWithGoogle
} from 'react-firebase-hooks/auth';
import LoadingSpinner from '../Shared/Utilities/LoadingSpinner';
import googleLogo from '../../assets/google.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [userMode, setUserMode] = useState('student');
  const [userExists, setUserExists] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [findingUser, setFindingUser] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMatched, setPasswordMatched] = useState(false);
  const [createUserWithEmailAndPassword, , loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, , googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [sendEmailVerification, , sending, verificationError] =
    useSendEmailVerification(auth);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);

  const userSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    createUserWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (user) {
      fetch(
        `http://localhost:5000/updateUser?userId=${userId}&userMode=${userMode}`,
        {
          method: 'put',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ userEmail: user.email })
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          navigate('/', { replace: true });
        });
    }
  }, [user, navigate, userId, userMode]);
  // console.log(userId);

  return (
    <div>
      {(loading || googleLoading || sending || findingUser) && (
        <LoadingSpinner />
      )}
      <h1 className='text-3xl font-bold text-center mt-3'>Sign Up now!</h1>
      <div className='flex gap-3 justify-center pt-2'>
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
        </button>
      </div>
      <form onSubmit={(e) => userSignUp(e)}>
        <div className='card w-96 mx-auto shadow-2xl bg-base-100'>
          <div className='card-body pt-1'>
            {/* User ID  */}
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
                onChange={(e) => {
                  const givenUserId = e.target.value;
                  if (givenUserId.length === 8) {
                    setFindingUser(true);

                    fetch('http://localhost:5000/findUser', {
                      method: 'post',
                      headers: {
                        'content-type': 'application/json'
                      },
                      body: JSON.stringify({
                        userId: givenUserId,
                        userMode
                      })
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        if (data.result === 1) {
                          setUserExists(true);
                          setErrorMessage('User Exists');
                        } else if (data.result === 0) {
                          setUserExists(false);
                          setErrorMessage('');
                          setUserId(givenUserId);
                        } else {
                          setUserExists(true);
                          setErrorMessage('Wrong User ID');
                        }
                      });
                    setFindingUser(false);
                  } else {
                    setUserExists(true);
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

            <div className='flex flex-col w-full border-opacity-50 mt-2'>
              {/* Email */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Student Email</span>
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
                  name='password1'
                  placeholder='Enter password'
                  className='input input-primary'
                  required
                  disabled={userExists}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* ReEnter Password */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Re-Enter Password</span>
                </label>
                <input
                  type='password'
                  name='password2'
                  placeholder='Re-Enter password'
                  className='input input-primary'
                  required
                  disabled={userExists}
                  onChange={(e) => {
                    if (e.target.value !== password) {
                      setErrorMessage('Password not matched');
                    } else {
                      setPasswordMatched(true);
                      setErrorMessage('');
                    }
                  }}
                />
              </div>
              {error ? (
                <span className='text-sm text-center text-red-500 pt-1'>
                  {error.message}
                </span>
              ) : (
                ''
              )}
              {errorMessage ? (
                <span className='text-sm text-center text-red-500 pt-1'>
                  {errorMessage}
                </span>
              ) : (
                ''
              )}
              <div className='form-control mt-6'>
                <button
                  className='btn btn-primary'
                  type='submit'
                  disabled={userExists || !passwordMatched}
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
