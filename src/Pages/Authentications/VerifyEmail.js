import React, { useEffect, useState } from 'react';
import {
  useAuthState,
  useSendEmailVerification
} from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.config';
import useCurrentTime from '../../hooks/useCurrentTime';

const VerifyEmail = () => {
  const [user] = useAuthState(auth);
  const [sendEmailVerification, sending, error] =
    useSendEmailVerification(auth);
  const [currentTime] = useCurrentTime();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (user?.emailVerified) {
      navigate(from, { replace: true });
    }
  }, [currentTime, from, user, navigate]);

  return (
    <div className='text-center mt-6'>
      <h3 className='text-3xl'>Please verify your email</h3>
      {!clicked ? (
        <p className='text-lg'>
          <button
            className='px-1 text-primary'
            onClick={async () => {
              const success = await sendEmailVerification();
              if (success) {
                toast.success(
                  'Email verification sent. Check your mail inbox.'
                );
                setClicked(true);
              }
            }}
          >
            Click here to verify your email now.
          </button>
        </p>
      ) : (
        <p className='text-lg'>
          Email verification mail sent. Please check your mail inbox.
        </p>
      )}
      <p className='text-lg'>
        Already verified?{' '}
        <button className='text-primary' onClick={() => navigate(0)}>
          Click here to reload the page
        </button>
      </p>
    </div>
  );
};

export default VerifyEmail;
