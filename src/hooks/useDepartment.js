import { useEffect, useState } from 'react';

const useDepartment = (faculty) => {
  const [dept, setDept] = useState([]);
  useEffect(() => {
    switch (faculty) {
      case 'agriculture':
        setDept([
          {
            dept: 'Agriculture',
            deptValue: 'agriculture'
          }
        ]);
        break;

      case 'cse':
        setDept([
          {
            dept: 'Computer Science and Engineering',
            deptValue: 'cse'
          },
          {
            dept: 'Electronics and Communication Engineering',
            deptValue: 'ece'
          },
          {
            dept: 'Electrical and Electronic Engineering',
            deptValue: 'eee'
          }
        ]);
        break;

      case 'bs':
        setDept([
          {
            dept: 'Accounting',
            deptValue: 'accounting'
          },
          {
            dept: 'Finance and Banking',
            deptValue: 'finance'
          },
          {
            dept: 'Management',
            deptValue: 'management'
          },
          {
            dept: 'Marketing',
            deptValue: 'marketing'
          }
        ]);
        break;

      case 'fisheries':
        setDept([{ dept: 'Fisheries', deptValue: 'fisheries' }]);
        break;

      case 'dvm':
        setDept([{ dept: 'Veterinary and Animal Science', deptValue: 'dvm' }]);
        break;

      case 'engineering':
        setDept([
          {
            dept: 'Agricultural and Industrial Engineering',
            deptValue: 'aie'
          },
          {
            dept: 'Food Process and Preservation',
            deptValue: 'fpp'
          },
          {
            dept: 'Food Engineering & Technology',
            deptValue: 'fet'
          },
          {
            dept: 'Food Science and Nutrition',
            deptValue: 'fsn'
          },
          {
            dept: 'Architecture',
            deptValue: 'architecture'
          },
          {
            dept: 'Civil Engineering',
            deptValue: 'ce'
          },
          {
            dept: 'Mechanical Engineering',
            deptValue: 'me'
          }
        ]);
        break;

      case 'science':
        setDept([
          {
            dept: 'Chemistry',
            deptValue: 'chemistry'
          },
          {
            dept: 'Physics',
            deptValue: 'physics'
          },
          {
            dept: 'Mathematics',
            deptValue: 'mathematics'
          },
          {
            dept: 'Statistics',
            deptValue: 'statistics'
          }
        ]);
        break;

      case 'ssh':
        setDept([
          {
            dept: 'English',
            deptValue: 'english'
          },
          {
            dept: 'Economics',
            deptValue: 'economics'
          },
          {
            dept: 'Sociology',
            deptValue: 'sociology'
          },
          {
            dept: 'Development Studies',
            deptValue: 'developmentStudies'
          }
        ]);
        break;

      default:
        setDept([]);
    }
  }, [faculty]);

  return [dept];
};

export default useDepartment;
