import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useDegree from '../../../hooks/useDegree';
import useDepartment from '../../../hooks/useDepartment';
import useMaxDate from '../../../hooks/useMaxDate';
import useRole from '../../../hooks/useRole';
import CheckVerification from '../../Authentications/CheckVerification';
import CQ from '../../StudentPanel/StudentOnlineExam/CQ';
import AvailableQuestions from './AvailableQuestions';
import OldExams from './OldExams';

const TeacherOnlineExam = () => {
  const [role] = useRole();
  const [toggleExamMode, setToggleExamMode] = useState('old');
  const [examType, setExamType] = useState('cq');
  const [questions, setQuestions] = useState([]);
  const [faculty, setFaculty] = useState('');
  const [dept] = useDepartment(faculty);
  const [department, setDepartment] = useState('');
  const [degree] = useDegree(department);
  const [errorMessage, setErrorMessage] = useState('');
  const [editQuestion, setEditQuestion] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState('');
  const [previewQuestion, setPreviewQuestion] = useState(false);
  const [level, setLevel] = useState('');
  const [semester, setSemester] = useState('');
  const [oldQuestions, setOldQuestions] = useState([]);
  const [questionModified, setQuestionModified] = useState(false);

  const teacherId = '12345';

  const dateMonthModifier = (date, month) => {
    let newDate, newMonth;
    if (`${date}`.length === 1) {
      newDate = `0${date}`;
    } else {
      newDate = `${date}`;
    }

    if (`${month}`.length === 1) {
      newMonth = `0${month}`;
    } else {
      newMonth = `${month}`;
    }

    return [newDate, newMonth];
  };

  const date = new Date();
  const year = date.getFullYear();
  const hours = `${date.getHours()}`;
  const minutes = `${date.getMinutes()}`;

  const currentTime = `${hours.length === 2 ? hours : '0' + hours}:${
    minutes.length === 2 ? minutes : 0 + minutes
  }`;

  const [currentDate, currentMonth] = dateMonthModifier(
    new Date().getDate(),
    new Date().getMonth() + 1
  );

  const [maxDate] = useMaxDate(
    year,
    parseInt(currentMonth),
    parseInt(currentDate)
  );

  const [maxDay, maxMonth] = dateMonthModifier(
    maxDate.split('T')[0].split('-')[2],
    maxDate.split('T')[0].split('-')[1]
  );
  const modifiedMaxDate = `${
    maxDate.split('T')[0].split('-')[0]
  }-${maxMonth}-${maxDay}T${maxDate.split('T')[1]}`;

  const questionSubmit = (e) => {
    e.preventDefault();
    const questionText = e.target.questionField.value;
    if (questionText) {
      const newQuestion = {
        questionId: questions.length + 1,
        question: questionText
      };
      setQuestions([...questions, newQuestion]);
      e.target.reset();
    } else {
      setErrorMessage('Please write the question first');
    }
  };

  const updateQuestionButton = (updatedQuestionText, questionId) => {
    if (updatedQuestionText) {
      const updatedQuestions = questions.map((q) => {
        if (q.questionId !== questionId) {
          return q;
        } else {
          q.question = updatedQuestionText;
          return q;
        }
      });
      setQuestions(updatedQuestions);
    }
    setEditQuestion(!editQuestion);
  };

  const editQuestionButton = (questionId, isEditQuestion) => {
    setQuestionToEdit(questionId);
    setEditQuestion(isEditQuestion);
  };

  const deleteQuestion = (questionId) => {
    const restQuestions = questions.filter((q) => q.questionId !== questionId);
    setQuestions(restQuestions);
  };

  const launchQuestions = (e) => {
    e.preventDefault();
    const duration = e.target.duration.value;
    const examMarks = e.target.examMarks.value;
    const examDateTime = e.target.examDateTime.value;
    const examTitle = e.target.examTitle.value;
    const examYear = examDateTime.slice(0, 4);
    const examMonth = examDateTime.slice(5, 7);
    const eDate = examDateTime.slice(8, 10);
    const eTime = examDateTime.split('T')[1];

    let examDate;
    switch (examMonth) {
      case '01':
        examDate = `Jan ${eDate}, ${examYear}`;
        break;
      case '02':
        examDate = `Feb ${eDate}, ${examYear}`;
        break;
      case '03':
        examDate = `Mar ${eDate}, ${examYear}`;
        break;
      case '04':
        examDate = `Apr ${eDate}, ${examYear}`;
        break;
      case '05':
        examDate = `May ${eDate}, ${examYear}`;
        break;
      case '06':
        examDate = `Jun ${eDate}, ${examYear}`;
        break;
      case '07':
        examDate = `Jul ${eDate}, ${examYear}`;
        break;
      case '08':
        examDate = `Aug ${eDate}, ${examYear}`;
        break;
      case '09':
        examDate = `Sep ${eDate}, ${examYear}`;
        break;
      case '10':
        examDate = `Oct ${eDate}, ${examYear}`;
        break;
      case '11':
        examDate = `Nov ${eDate}, ${examYear}`;
        break;
      case '12':
        examDate = `Dec ${eDate}, ${examYear}`;
        break;
      default:
    }
    let examTime;
    const hour = eTime.split(':')[0];
    const minutes = eTime.split(':')[1];
    if (hour <= 12) {
      // am
      if (hour < 10) {
        examTime = `${hour.slice(1, 2)}:${minutes} AM`;
      } else {
        examTime = `${hour}:${minutes} AM`;
      }
    } else {
      // pm
      examTime = `${hour - 12}:${minutes} PM`;
    }
    const examTimeInMilliseconds = new Date(examDateTime).getTime();
    let examTimeWithDurationInMilliseconds;
    if (parseInt(duration) + parseInt(minutes) < 60) {
      examTimeWithDurationInMilliseconds = new Date(
        `${examDate} ${hour}:${parseInt(minutes) + parseInt(duration)}`
      ).getTime();
    } else {
      examTimeWithDurationInMilliseconds = new Date(
        `${examDate} ${parseInt(hour) + 1}:${
          parseInt(minutes) + parseInt(duration) - 60
        }`
      ).getTime();
    }

    const examQuestion = {
      examType,
      faculty,
      department,
      level,
      semester,
      degree,
      courseTeacher: 'ABCD',
      teacherId: '12345',
      courseCode: 'ECE 443',
      courseTitle: 'Database Design',
      examTitle,
      duration: duration + ' minutes',
      examMarks,
      examDate,
      examTime,
      examTimeInMilliseconds,
      examTimeWithDurationInMilliseconds,
      questions,
      answers: [],
      examCompleted: false,
      resultStatus: 'not published'
    };

    fetch('http://localhost:5000/examQuestions', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(examQuestion)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success('Question added!');
          e.target.reset();
          setQuestions([]);
          setPreviewQuestion(false);
          setFaculty('');
          setDepartment('');
          setLevel('');
          setSemester('');
        }
      });
  };

  useEffect(() => {
    if (toggleExamMode === 'old') {
      fetch(`http://localhost:5000/teacherExamQuestions?teacherId=${teacherId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setOldQuestions(data);
          } else {
            setOldQuestions([]);
          }
        });
    }
  }, [toggleExamMode, questionModified]);

  return (
    <div className='mt-2'>
      <CheckVerification />
      <div className='flex  gap-3 justify-center'>
        <button
          className={`btn btn-sm rounded-full btn-primary w-42 lg:uppercase normal-case  ${
            toggleExamMode === 'old' && 'btn-disabled'
          }`}
          onClick={() => setToggleExamMode('old')}
        >
          View Existing Exams
        </button>
        <button
          className={`btn btn-sm rounded-full btn-primary w-42 lg:uppercase normal-case ${
            toggleExamMode === 'new' && 'btn-disabled'
          }`}
          onClick={() => setToggleExamMode('new')}
        >
          {role === 'student' ? 'Participate' : 'Launch'} New Exam
        </button>
      </div>

      {toggleExamMode === 'new' ? (
        <>
          <div className=''>
            <div className='flex flex-col items-center justify-center gap-2'>
              <div className=''>
                <label className='label'>
                  <span className='label-text text-lg'>Faculty</span>
                </label>
                <select
                  className='select select-primary w-80 lg:w-96 text-base font-normal'
                  onChange={(e) => setFaculty(e.target.value)}
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
              <div className=''>
                <label className='label'>
                  <span className='label-text text-lg'>Department</span>
                </label>
                <select
                  className='select select-primary w-80 lg:w-96 text-base font-normal'
                  disabled={!faculty}
                  onChange={(e) => setDepartment(e.target.value)}
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
            </div>
            <div className='flex items-center justify-center gap-1 lg:gap-x-16 pb-2'>
              <div className=''>
                <label className='label'>
                  <span className='label-text text-lg'>Level</span>
                </label>
                <select
                  className='select select-primary w-40 text-base font-normal'
                  disabled={!department}
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option value='' defaultValue={!faculty}>
                    - - Level - -
                  </option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                </select>
              </div>
              <div className=''>
                <label className='label'>
                  <span className='label-text text-lg'>Semester</span>
                </label>
                <select
                  className='select select-primary w-40 text-base font-normal'
                  disabled={!level}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <option value='' defaultValue={!faculty}>
                    - - Semester - -
                  </option>
                  <option value='I'>I</option>
                  <option value='II'>II</option>
                </select>
              </div>
            </div>
          </div>
          {semester ? (
            <div>
              <div className='flex justify-center gap-2 pb-2'>
                <button
                  className={`btn btn-sm rounded-full btn-primary w-16 ${
                    examType === 'cq' && 'btn-disabled'
                  }`}
                  onClick={() => setExamType('cq')}
                >
                  CQ
                </button>
                <button
                  className={`btn btn-sm rounded-full btn-primary w-16 ${
                    examType === 'mcq' && 'btn-disabled'
                  }`}
                  onClick={() => setExamType('mcq')}
                >
                  MCQ
                </button>
              </div>
              {/* Questions */}
              {examType === 'cq' ? (
                <div className='overflow-x-auto w-full'>
                  {previewQuestion ? (
                    <CQ testQuestions={questions} preview={true} />
                  ) : (
                    <form onSubmit={(e) => questionSubmit(e)}>
                      <table
                        className='table table-zebra lg:w-1/2 mx-auto rounded-full'
                        data-theme='dark'
                      >
                        {/* Table Head */}
                        <thead className='text-center'>
                          <tr>
                            <th className='w-8'>SL</th>
                            <th className=''>Question</th>
                            <th className='w-8'>Action</th>
                          </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody className='text-center'>
                          {questions.length ? (
                            <>
                              {questions.map((q, index) => (
                                <AvailableQuestions
                                  q={q}
                                  index={index}
                                  key={index}
                                  editQuestion={editQuestion}
                                  editQuestionButton={editQuestionButton}
                                  questionToEdit={questionToEdit}
                                  errorMessage={errorMessage}
                                  setErrorMessage={setErrorMessage}
                                  updateQuestionButton={updateQuestionButton}
                                  deleteQuestion={deleteQuestion}
                                />
                              ))}
                            </>
                          ) : (
                            <tr></tr>
                          )}
                          {/* add new question */}
                          {!editQuestion ? (
                            <tr>
                              <td>{questions.length + 1}</td>
                              <td className='relative'>
                                <textarea
                                  name='questionField'
                                  className='textarea bg-white text-lg text-black w-full'
                                  placeholder='Question'
                                  onFocus={() => setErrorMessage('')}
                                />
                                <p className='text-sm p-0 bottom-px text-center text-red-400 absolute inset-x-1/4'>
                                  {errorMessage}
                                </p>
                              </td>

                              <td>
                                <button
                                  type='submit'
                                  className='btn btn-sm lg:btn-md rounded-full btn-primary w-20'
                                >
                                  Add
                                </button>
                              </td>
                            </tr>
                          ) : (
                            <tr></tr>
                          )}
                        </tbody>
                      </table>
                    </form>
                  )}
                  {questions.length ? (
                    <p className='text-xl text-center py-2'>
                      {previewQuestion
                        ? 'Edit Questions?'
                        : 'Done making questions?'}
                      <span
                        className='text-primary pl-2 cursor-pointer'
                        onClick={() => setPreviewQuestion(!previewQuestion)}
                      >
                        {previewQuestion ? 'click here' : 'see preview'}
                      </span>
                    </p>
                  ) : (
                    ''
                  )}

                  {previewQuestion ? (
                    <>
                      <form onSubmit={(e) => launchQuestions(e)}>
                        <div className='flex flex-col justify-center items-center gap-2 py-2'>
                          <div className='flex-col lg:flex-row'>
                            <div className='flex flex-col lg:flex-row gap-3'>
                              <div className=''>
                                <label className='label'>
                                  <span className='font-bold'>Exam Title</span>
                                </label>
                                <input
                                  type='text'
                                  name='examTitle'
                                  className='input input-primary w-[21rem] lg:w-60 text-base font-normal'
                                  placeholder='Enter exam title here'
                                  required
                                />
                              </div>
                              <div className=''>
                                <label className='label'>
                                  <span className='font-bold'>Exam Marks</span>
                                </label>
                                <input
                                  type='number'
                                  className='input input-primary w-[21rem] lg:w-60'
                                  name='examMarks'
                                  placeholder='Enter exam marks here'
                                  min={5}
                                  required
                                  onWheel={(e) => e.target.blur()}
                                />
                              </div>
                            </div>
                            <div className='flex flex-col lg:flex-row gap-3'>
                              <div>
                                <label className='label'>
                                  <span className='font-bold'>
                                    Time Duration (in minutes)
                                  </span>
                                </label>
                                <input
                                  type='number'
                                  name='duration'
                                  placeholder='Enter duration'
                                  className='input input-primary w-[21rem] lg:w-60'
                                  required
                                  min={0}
                                  max={59}
                                  onWheel={(e) => e.target.blur()}
                                />
                              </div>
                              <div className=''>
                                <label className='label'>
                                  <span className='font-bold'>
                                    Exam Date-Time
                                  </span>
                                </label>
                                <input
                                  type='datetime-local'
                                  name='examDateTime'
                                  // min={`${year}-${currentMonth}-${currentDate}T08:00`}
                                  max={modifiedMaxDate}
                                  defaultValue={`${year}-${currentMonth}-${currentDate}T${currentTime}`}
                                  className='input input-primary w-[21rem] lg:w-60'
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <button className='btn btn-primary rounded-full flex mx-auto lg:w-1/5'>
                          Launch Questions
                        </button>
                      </form>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              ) : (
                <div className='overflow-x-auto w-full text-center text-3xl'>
                  This page is under development
                </div>
              )}
            </div>
          ) : (
            ''
          )}
        </>
      ) : (
        <OldExams oldQuestions={oldQuestions} />
      )}
    </div>
  );
};

export default TeacherOnlineExam;
