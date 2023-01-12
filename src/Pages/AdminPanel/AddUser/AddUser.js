import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useDepartment from '../../../hooks/useDepartment';

const AddUser = () => {
  const [userMode, setUserMode] = useState('student');
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');
  const [dept] = useDepartment(faculty);
  const [userId, setUserId] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddStudent = (e) => {
    e.preventDefault();
    const studentId = e.target.studentId.value;
    const studentName = e.target.name.value;
    const level = e.target.level.value;
    const semester = e.target.semester.value;
    const session = e.target.session.value;
    const newStudent = {
      studentName,
      studentId,
      faculty,
      department,
      level,
      semester,
      session,
    };
    fetch(`http://localhost:5000/addUser?userMode=${userMode}`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result?.acknowledged) {
          toast.success('User added successfully');
          setUserId({ studentId, userId: data.userId });
          e.target.reset();
          setFaculty('');
          setDepartment('');
        } else {
          setErrorMessage(data.message);
        }
      });
  };

  return (
    <div>
      {/* toggle user mode */}
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
        </button>
      </div>

      <form onSubmit={(e) => handleAddStudent(e)}>
        <div className='card max-w-sm mx-auto shadow-2xl bg-base-100'>
          <div className='card-body'>
            {/* student ID */}
            <div className='form-control'>
              <label className='label'>
                <span className=''>Student ID</span>
              </label>
              <input
                type='number'
                name='studentId'
                placeholder='Enter Student ID'
                className='input input-primary'
                required
                onWheel={(e) => e.target.blur()}
                onFocus={() => setErrorMessage('')}
              />
            </div>
            {/* name */}
            <div className='form-control'>
              <label className='label'>
                <span className=''>Name</span>
              </label>
              <input
                type='text'
                name='name'
                placeholder='Enter Name'
                className='input input-primary'
                required
              />
            </div>
            {/* faculty */}
            <div className='form-control'>
              <label className='label'>
                <span className=''>Faculty</span>
              </label>
              <select
                className='select select-primary text-base font-normal'
                onChange={(e) => setFaculty(e.target.value)}
                required
              >
                <option value='' selected={!faculty}>
                  - - Select Faculty - -
                </option>
                <option value='agriculture'>Agriculture</option>
                <option value='cse'>Computer Science and Engineering</option>
                <option value='bs'>Business Studies</option>
                <option value='fisheries'>Fisheries</option>
                <option value='dvm'>Veterinary and Animal Science</option>
                <option value='engineering'>Engineering</option>
                <option value='science'>Science</option>
                <option value='ssh'>Social Science and Humanities</option>
              </select>
            </div>
            {/* department */}
            <div className='form-control'>
              <label className='label'>
                <span className=''>Department</span>
              </label>
              <select
                className='select select-primary text-base font-normal'
                onChange={(e) => setDepartment(e.target.value)}
                required
              >
                <option value='' selected={!faculty}>
                  - - Select Department - -{' '}
                </option>
                {dept?.map((d, index) => (
                  <option key={index} value={d.deptValue}>
                    {d.dept}
                  </option>
                ))}
              </select>
            </div>
            {/* level & semester */}
            <div className='flex gap-2'>
              {/* level */}
              <div className='form-control'>
                <label className='label'>
                  <span className=''>Level</span>
                </label>
                <select
                  className='select select-primary w-[9.7rem] text-base font-normal'
                  name='level'
                  required
                >
                  <option value='' selected={!faculty}>
                    - - Level - -
                  </option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                </select>
              </div>
              {/* semester */}
              <div className='form-control'>
                <label className='label'>
                  <span className=''>Semester</span>
                </label>
                <select
                  className='select select-primary w-[9.7rem] text-base font-normal'
                  name='semester'
                  required
                >
                  <option value='' selected={!faculty}>
                    - - Semester - -
                  </option>
                  <option value='I'>I</option>
                  <option value='II'>II</option>
                </select>
              </div>
            </div>
            {/* session */}
            <div className='form-control'>
              <label className='label'>
                <span className=''>Session</span>
              </label>
              <input
                type='number'
                name='session'
                placeholder='Enter Session'
                className='input input-primary'
                required
                onWheel={(e) => e.target.blur()}
              />
            </div>
            {userId.studentId ? (
              <p className='text-center'>
                User ID is for {userId.studentId} is
                <span className='text-primary ml-1 font-bold'>
                  {userId.userId}
                </span>
              </p>
            ) : (
              ''
            )}
            {errorMessage ? (
              <p className='text-center text-red-500'>{errorMessage}</p>
            ) : (
              ''
            )}
            <div className='form-control mt-6'>
              <button className='btn btn-primary' type='submit'>
                Add User
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
