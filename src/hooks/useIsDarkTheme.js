import { useEffect, useState } from 'react';

const useIsDarkTheme = () => {
  const [isDarkTheme, setIsDarkTheme] = useState('false');
  const theme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  useEffect(() => {
    theme === true ? setIsDarkTheme(true) : setIsDarkTheme(false);
  }, [theme]);
  return [isDarkTheme];
};

export default useIsDarkTheme;
