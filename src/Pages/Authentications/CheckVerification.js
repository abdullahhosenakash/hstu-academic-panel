import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.config';

const CheckVerification = () => {
  const [user] = useAuthState(auth);
  const location = useLocation();
  if (!user?.emailVerified) {
    // return <Navigate to='/verifyEmail' state={{ from: location }} />;
  }
};

export default CheckVerification;
