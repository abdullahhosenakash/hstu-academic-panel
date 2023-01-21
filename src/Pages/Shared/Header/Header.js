import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import CustomLink from './CustomLink';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.config';
import { signOut } from 'firebase/auth';

const Header = ({ role }) => {
  const [user] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState({});
  console.log(user.emailVerified);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/studentInfo?userEmail=${user.email}`)
        .then((res) => res.json())
        .then((data) => setUserInfo(data));
    }
  }, [user]);

  const NavItems = () => {
    return (
      <>
        {role === 'teacher' && (
          <>
            <li>
              <CustomLink to='/classSchedule'>Class Schedule</CustomLink>
            </li>
            <li>
              <CustomLink to='/teacherOnlineExam'>Online Exam</CustomLink>
            </li>
            <li>
              <CustomLink to='/updateResult'>Update Result</CustomLink>
            </li>
          </>
        )}

        {role === 'admin' && (
          <>
            <li>
              <CustomLink to='/addUser'>Add User</CustomLink>
            </li>
            <li>
              <CustomLink to='/updateResult'>Update Result</CustomLink>
            </li>
            <li>
              <CustomLink to='/manageStudents'>Manage Students</CustomLink>
            </li>
          </>
        )}
        {role === 'student' && (
          <>
            <li>
              <CustomLink to='/classSchedule'>Class Schedule</CustomLink>
            </li>
            <li>
              <CustomLink to='/studentOnlineExam'>Online Exam</CustomLink>
            </li>
            <li>
              <CustomLink to='/result'>Result</CustomLink>
            </li>
            <li>
              <CustomLink to='/enrollment'>Enrollment</CustomLink>
            </li>
          </>
        )}
        <li>
          <CustomLink to='/notices'>Notices</CustomLink>
        </li>
      </>
    );
  };

  return (
    <div className='navbar dark:bg-[#4338ca] bg-[#cbd5e1] dark:text-white'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <label tabIndex={0} className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary rounded-box w-52'
          >
            <NavItems />
            {user ? (
              <>
                <CustomLink
                  to='/profile'
                  className='font-semibold uppercase text-sm'
                >
                  Md Abdullah Hosen<sup>{role}</sup>
                </CustomLink>
                <button className='btn btn-ghost'>Log Out</button>
                <button className='btn btn-ghost'>
                  <FontAwesomeIcon icon={faCircleHalfStroke} />
                </button>
              </>
            ) : (
              <>
                <CustomLink to='/login'>Login</CustomLink>
                <CustomLink to='/signUp'>Sign Up</CustomLink>
              </>
            )}
          </ul>
        </div>
        <Link to='/' className='btn btn-ghost normal-case text-xl'>
          HSTU Online Services
        </Link>
      </div>
      <div className='navbar-start hidden lg:flex'>
        <ul className='menu menu-horizontal px-1'>
          <NavItems />
        </ul>
      </div>
      <div className='navbar-end hidden lg:flex'>
        {user ? (
          <>
            <CustomLink
              to='/profile'
              className='font-semibold uppercase text-sm'
            >
              {userInfo.userMode === 'student'
                ? userInfo.studentName
                : userInfo.userMode === 'teacher'
                ? userInfo.teacherName
                : userInfo.adminName}
              <sup>{role}</sup>
            </CustomLink>
            <button className='btn btn-ghost' onClick={() => signOut(auth)}>
              Log Out
            </button>
            <button className='btn btn-ghost'>
              <FontAwesomeIcon icon={faCircleHalfStroke} />
            </button>
          </>
        ) : (
          <>
            <CustomLink to='/login'>Login</CustomLink>
            <CustomLink to='/signUp'>Sign Up</CustomLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
