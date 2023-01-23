import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import googleLogo from '../../assets/google.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import {
  useAuthState,
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdatePassword
} from 'react-firebase-hooks/auth';
import auth from '../../firebase.config';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../Shared/Utilities/LoadingSpinner';

const Login = () => {
  const [userExists, setUserExists] = useState(false);
  const [userMode, setUserMode] = useState('student');
  const [errorMessage, setErrorMessage] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [findingUser, setFindingUser] = useState(false);
  const [userId, setUserId] = useState('');
  const [signInWithGoogle, , googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, , emailLoading, emailError] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, resetError] =
    useSendPasswordResetEmail(auth);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const recoverPassword = async (e) => {
    e.preventDefault();
    const success = await sendPasswordResetEmail(userEmail);
    if (success) {
      toast.success('Password reset email sent. Check your mail inbox');
    }
  };

  const userLogin = (e, loginMethod) => {
    e.preventDefault();
    if (loginMethod === 'google') {
      signInWithGoogle();
    } else {
      const email = e.target.email.value;
      const password = e.target.password.value;
      signInWithEmailAndPassword(email, password);
    }
    localStorage.setItem('role', userMode);
  };

  useEffect(() => {
    if (user) {
      if (!user.emailVerified) {
        navigate('/verifyEmail', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    }

    if (googleError) {
      setErrorMessage({ gError: googleError.message });
    } else if (emailError) {
      setErrorMessage({ eError: emailError.message });
    } else if (resetError) {
      setErrorMessage({ resetError: resetError.message });
    }
  }, [emailError, googleError, user, navigate, from, resetError]);

  return (
    <div>
      {(findingUser || googleLoading || emailLoading || sending) && (
        <LoadingSpinner />
      )}
      <h1 className='text-3xl font-bold text-center mt-3'>Login now!</h1>
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

      <form onSubmit={(e) => userLogin(e, 'emailPassword')}>
        <div className='card w-96 mx-auto shadow-2xl bg-base-100'>
          <div className='card-body pt-4'>
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
                onFocus={() => setErrorMessage({})}
                onChange={(e) => {
                  const givenUserId = e.target.value;
                  if (givenUserId.length === 8) {
                    setFindingUser(true);

                    fetch(
                      'https://hstu-online-services-server.onrender.com/findUser',
                      {
                        method: 'post',
                        headers: {
                          'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                          userId: givenUserId,
                          userMode
                        })
                      }
                    )
                      .then((res) => res.json())
                      .then((data) => {
                        if (data.result === 1) {
                          setUserExists(true);
                          setErrorMessage({});
                        } else if (data.result === 0) {
                          setUserExists(false);
                          setErrorMessage({ otherError: 'User Not Exists' });
                          setUserId(givenUserId);
                        } else {
                          setUserExists(false);
                          setErrorMessage({ otherError: 'Wrong User ID' });
                        }
                      });
                    setFindingUser(false);
                  } else {
                    setUserExists(false);
                  }
                }}
              />
              {!userExists && errorMessage?.otherError ? (
                <span className='text-sm text-center text-red-500 pt-1'>
                  {errorMessage.otherError}
                </span>
              ) : (
                ''
              )}
            </div>
            <div className='form-control'>
              <button
                className='btn btn-primary'
                disabled={!userExists}
                onClick={(e) => {
                  e.preventDefault();
                  userLogin(e, 'google');
                }}
              >
                {!userExists ? (
                  <span className='text-lg mr-2'>
                    <FontAwesomeIcon icon={faGoogle} />
                  </span>
                ) : (
                  <img src={googleLogo} alt='' className='w-8 mr-2' />
                )}
                Login with Google
              </button>
            </div>
            {errorMessage || errorMessage?.gError ? (
              <span className='text-sm text-center text-red-500 pt-1'>
                {errorMessage.gError}
              </span>
            ) : (
              ''
            )}
            <div className='divider'>OR</div>
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
                onBlur={(e) => setUserEmail(e.target.value)}
                onFocus={() => setErrorMessage({})}
                disabled={!userExists}
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
                onFocus={() => setErrorMessage({})}
                disabled={!userExists}
              />
              <label className='label'>
                <span className='label-text-alt'>
                  Forgot password?{' '}
                  <button
                    className='text-primary'
                    onClick={(e) => recoverPassword(e)}
                    disabled={!userExists}
                  >
                    recover now
                  </button>
                </span>
              </label>
            </div>
            {errorMessage?.eError && (
              <span className='text-sm text-center text-red-500 pt-1'>
                {errorMessage.eError}
              </span>
            )}

            {errorMessage?.resetError && (
              <span className='text-sm text-center text-red-500 pt-1'>
                {errorMessage.resetError}
              </span>
            )}

            <div className='form-control mt-6'>
              <button
                className='btn btn-primary'
                type='submit'
                disabled={!userExists}
              >
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
