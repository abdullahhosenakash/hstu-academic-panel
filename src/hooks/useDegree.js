import { useEffect, useState } from 'react';

const useDegree = (department) => {
  const [degree, setDegree] = useState('');
  useEffect(() => {
    switch (department) {
      case 'agriculture':
        setDegree('B.Sc. (Hons.) in Agriculture');
        break;
      case 'cse':
        setDegree('B.Sc. (Engineering) in CSE');
        break;
      case 'ece':
        setDegree('B.Sc. (Engineering) in ECE');
        break;
      case 'eee':
        setDegree('B.Sc. (Engineering) in EEE');
        break;
      case 'accounting':
      case 'finance':
      case 'management':
      case 'marketing':
        setDegree('Bachelor of Business Administration (BBA)');
        break;
      case 'fisheries':
        setDegree('B.Sc. (Hons.) in Fisheries');
        break;
      case 'dvm':
        setDegree('Doctor of Veterinary Medicine');
        break;
      case 'ae':
        setDegree('B.Sc. in Agricultural Engineering');
        break;
      case 'fpe':
        setDegree('B.Sc. in Food and Process Engineering');
        break;
      case 'architecture':
        setDegree('Bachelor of Architecture');
        break;
      case 'ce':
        setDegree('B.Sc. in Civil Engineering');
        break;
      case 'me':
        setDegree('B.Sc. in Mechanical Engineering');
        break;
      case 'chemistry':
        setDegree('B.Sc. in Chemistry');
        break;
      case 'physics':
        setDegree('B.Sc. in Physics');
        break;
      case 'mathematics':
        setDegree('B.Sc. in Mathematics');
        break;
      case 'statistics':
        setDegree('B.Sc. in Statistics');
        break;
      case 'english':
        setDegree('B.A. (Hons) in English');
        break;
      case 'economics':
        setDegree('B.S.S. (Hons) in Economics');
        break;
      case 'sociology':
        setDegree('B.S.S. (Hons) in Sociology');
        break;
      case 'developmentStudies':
        setDegree('B.S.S. (Hons) in Development Studies');
        break;
      default:
        setDegree('');
    }
  }, [department]);
  return [degree];
};

export default useDegree;
