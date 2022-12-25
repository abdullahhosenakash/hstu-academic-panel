import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ManageStudents from './Pages/AdminPanel/ManageStudents/ManageStudents';
import PendingUsers from './Pages/AdminPanel/PendingUsers/PendingUsers';
import Home from './Pages/Home/Home';
import ClassSchedule from './Pages/Shared/ClassSchedule/ClassSchedule';
import Header from './Pages/Shared/Header/Header';
import Notices from './Pages/Shared/Notices/Notices';
import Profile from './Pages/Shared/Profile/Profile';
import UpdateResult from './Pages/Shared/UpdateResult/UpdateResult';
import Enrollment from './Pages/StudentPanel/Enrollment/Enrollment';
import Result from './Pages/StudentPanel/Result/Result';
import OnlineExam from './Pages/Shared/OnlineExam/OnlineExam';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useRole from './hooks/useRole';

function App() {
  const [role, setRole] = useRole();
  console.log(role, 'ss');
  return (
    <div>
      <Header role={role} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/onlineExam' element={<OnlineExam />} />
        <Route path='/classSchedule' element={<ClassSchedule />} />
        <Route path='/updateResult' element={<UpdateResult />} />
        <Route path='/notices' element={<Notices />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/pendingUsers' element={<PendingUsers />} />
        <Route path='/manageStudents' element={<ManageStudents />} />
        <Route path='/result' element={<Result />} />
        <Route path='/enrollment' element={<Enrollment />} />
      </Routes>
      <div className='flex lg:flex-row flex-col gap-5 justify-center pt-32'>
        <button
          className={`btn btn-sm rounded-full btn-primary  ${
            role === 'student' && 'btn-disabled'
          }`}
          onClick={() => {
            localStorage.setItem('role', 'student');
            setRole('student');
          }}
        >
          Student View
        </button>
        <button
          className={`btn btn-sm rounded-full btn-primary ${
            role === 'teacher' && 'btn-disabled'
          }`}
          onClick={() => {
            localStorage.setItem('role', 'teacher');
            setRole('teacher');
          }}
        >
          Teacher View
        </button>
        <button
          className={`btn btn-sm rounded-full btn-primary ${
            role === 'admin' && 'btn-disabled'
          }`}
          onClick={() => {
            localStorage.setItem('role', 'admin');
            setRole('admin');
          }}
        >
          Admin View
        </button>
      </div>
      <div className='text-red-700  text-center text-4xl'>
        This buttons are for development purpose and not for final production
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
