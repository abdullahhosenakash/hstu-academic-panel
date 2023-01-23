import React, { useState } from 'react';
import useDepartment from '../../../hooks/useDepartment';

const ManageStudents = () => {
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');
  const [session, setSession] = useState(0);
  const [dept] = useDepartment(faculty);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedBatch, setSelectedBatch] = useState({});
  const [students, setStudents] = useState([]);

  const resetInputs = () => {
    setFaculty('');
    setDepartment('');
    setSelectedBatch({});
  };

  const handleStudentDetails = (e) => {
    e.preventDefault();
    setSelectedBatch({ faculty, department, session });
    fetch(
      `https://hstu-online-services-server.onrender.com/findStudents?faculty=${faculty}&department=${department}&session=${session}`
    )
      .then((res) => res.json())
      .then((data) => setStudents(data));
  };

  return (
    <div>
      {selectedBatch.faculty ? (
        <div className='overflow-x-auto'>
          <table className='table table-zebra lg:w-1/2 mx-auto rounded-full mt-2'>
            {/* Table Head */}
            <caption className='text-xl text-center pt-2 rounded-t-lg bg-[#f2f2f2] font-bold'>
              <span className='mr-3'>
                Faculty: {selectedBatch.faculty.toUpperCase()}
              </span>
              <span className='mr-3'>
                Department: {selectedBatch.department.toUpperCase()}
              </span>
              <span>Session: {selectedBatch.session}</span>
            </caption>
            <thead className='text-center'>
              <tr>
                <th className='w-8'>SL</th>
                <td>Student ID</td>
                <th>Name</th>
                <th className=''>Level</th>
                <th className=''>Semester</th>
                <th className=''>User ID</th>
                <th className=''>Email</th>
                <th className='w-8'>Action</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className='text-center'>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{student.studentId}</td>
                  <td>{student.studentName}</td>
                  <td>{student.level}</td>
                  <td className='font-mono'>{student.semester}</td>
                  <td>{student.userId}</td>
                  <td>
                    {student.userEmail ? student.userEmail : 'not updated yet'}
                  </td>
                  <td>
                    <button className='btn btn-sm btn-primary rounded-full'>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <form onSubmit={(e) => handleStudentDetails(e)}>
          <div className='card max-w-sm mx-auto shadow-2xl bg-base-100'>
            <div className='card-body'>
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
                  <option value='' defaultValue={!faculty}>
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
                  <option value='' defaultValue={!faculty}>
                    - - Select Department - -{' '}
                  </option>
                  {dept?.map((d, index) => (
                    <option key={index} value={d.deptValue}>
                      {d.dept}
                    </option>
                  ))}
                </select>
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
                  min={1999}
                  max={new Date().getFullYear()}
                  onWheel={(e) => e.target.blur()}
                  onFocus={() => setErrorMessage('')}
                  onBlur={(e) => setSession(e.target.value)}
                />
              </div>
              {errorMessage ? (
                <p className='text-center text-red-500'>{errorMessage}</p>
              ) : (
                ''
              )}
              <div className='form-control mt-6'>
                <button className='btn btn-primary' type='submit'>
                  View Students
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ManageStudents;
