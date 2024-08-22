import { useState, useEffect } from 'react';

// Custom hook to get the current date in "yyyy-mm-dd" format
const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const getCurrentDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
      const day = now.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    setCurrentDate(getCurrentDate());
  }, []);

  return currentDate;
};

export default useCurrentDate;
