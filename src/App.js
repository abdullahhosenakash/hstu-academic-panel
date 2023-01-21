import { Route, Routes } from 'react-router-dom';
import './App.css';
import ManageStudents from './Pages/AdminPanel/ManageStudents/ManageStudents';
import AddUser from './Pages/AdminPanel/AddUser/AddUser';
import Home from './Pages/Home/Home';
import ClassSchedule from './Pages/Shared/ClassSchedule/ClassSchedule';
import Header from './Pages/Shared/Header/Header';
import Notices from './Pages/Shared/Notices/Notices';
import Profile from './Pages/Shared/Profile/Profile';
import UpdateResult from './Pages/Shared/UpdateResult/UpdateResult';
import Enrollment from './Pages/StudentPanel/Enrollment/Enrollment';
import Result from './Pages/StudentPanel/Result/Result';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useRole from './hooks/useRole';
import NotFound from './Pages/Shared/Errors/NotFound';
import EvaluateAnswers from './Pages/TeacherPanel/TeacherOnlineExam/EvaluateAnswers';
import Login from './Pages/Authentications/Login';
import SignUp from './Pages/Authentications/SignUp';
import TeacherOnlineExam from './Pages/TeacherPanel/TeacherOnlineExam/TeacherOnlineExam';
import StudentOnlineExam from './Pages/StudentPanel/StudentOnlineExam/StudentOnlineExam';
import ParticipateExam from './Pages/StudentPanel/StudentOnlineExam/ParticipateExam';
import RequireAuth from './Pages/Authentications/RequireAuth';
import VerifyEmail from './Pages/Authentications/VerifyEmail';

function App() {
  const [role, setRole] = useRole();

  return (
    <div>
      <Header role={role} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route
          path='/studentOnlineExam'
          element={
            <RequireAuth>
              <StudentOnlineExam />
            </RequireAuth>
          }
        />
        <Route
          path='/studentOnlineExam/participateExam'
          element={
            <RequireAuth>
              <ParticipateExam />
            </RequireAuth>
          }
        />
        <Route
          path='/teacherOnlineExam'
          element={
            <RequireAuth>
              <TeacherOnlineExam />
            </RequireAuth>
          }
        />
        <Route
          path='/teacherOnlineExam/evaluateAnswers'
          element={
            <RequireAuth>
              <EvaluateAnswers />
            </RequireAuth>
          }
        />

        <Route
          path='/classSchedule'
          element={
            <RequireAuth>
              <ClassSchedule />
            </RequireAuth>
          }
        />
        <Route
          path='/updateResult'
          element={
            <RequireAuth>
              <UpdateResult />
            </RequireAuth>
          }
        />
        <Route
          path='/notices'
          element={
            <RequireAuth>
              <Notices />
            </RequireAuth>
          }
        />
        <Route
          path='/profile'
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path='/addUser'
          element={
            <RequireAuth>
              <AddUser />
            </RequireAuth>
          }
        />
        <Route
          path='/manageStudents'
          element={
            <RequireAuth>
              <ManageStudents />
            </RequireAuth>
          }
        />
        <Route
          path='/result'
          element={
            <RequireAuth>
              <Result />
            </RequireAuth>
          }
        />
        <Route
          path='/enrollment'
          element={
            <RequireAuth>
              <Enrollment />
            </RequireAuth>
          }
        />

        <Route
          path='/verifyEmail'
          element={
            <RequireAuth>
              <VerifyEmail />
            </RequireAuth>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
      {/* <Footer /> */}
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
