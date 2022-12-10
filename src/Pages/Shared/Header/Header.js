import React from 'react';
import { Link } from 'react-router-dom';
import CustomLink from './CustomLink';

const Header = ({ role }) => {
  const user = 'v';
  const NavItems = () => {
    return (
      <>
        {role === 'teacher' && (
          <>
            <li>
              <CustomLink to='/classSchedule'>Class Schedule</CustomLink>
            </li>
            <li>
              <CustomLink to='/onlineExam'>Online Exam</CustomLink>
            </li>
            <li>
              <CustomLink to='/updateResult'>Update Result</CustomLink>
            </li>
          </>
        )}

        {role === 'admin' && (
          <>
            <li>
              <CustomLink to='/pendingUsers'>Pending Users</CustomLink>
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
              <CustomLink to='/onlineExam'>Online Exam</CustomLink>
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
    <div className='navbar  bg-primary text-white'>
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
            className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
          >
            <NavItems />
          </ul>
        </div>
        <Link to='/' className='btn btn-ghost normal-case text-xl'>
          HSTU Academic Panel
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
              Md Abdullah Hosen<sup>{role}</sup>
            </CustomLink>
            <button className='btn btn-ghost'>Log Out</button>
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
