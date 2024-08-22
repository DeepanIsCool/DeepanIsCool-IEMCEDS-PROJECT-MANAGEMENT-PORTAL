import { useMemo } from 'react';

const useProjectDuration = (currentDateStr, expiryDateStr) => {
  const calculateDuration = (currentDateStr, expiryDateStr) => {
    // Parse the input date strings to Date objects
    const currentDate = new Date(currentDateStr);
    const expiryDate = new Date(expiryDateStr);

    // Calculate the difference in time
    let differenceInMonths = (expiryDate.getFullYear() - currentDate.getFullYear()) * 12 + (expiryDate.getMonth() - currentDate.getMonth());
    let differenceInDays = expiryDate.getDate() - currentDate.getDate();

    if (differenceInDays < 0) {
      // If days difference is negative, adjust by borrowing a month
      differenceInMonths--;
      const lastMonth = new Date(expiryDate.getFullYear(), expiryDate.getMonth(), 0);
      differenceInDays += lastMonth.getDate();
    }

    // Format the result in words
    const months = Math.abs(differenceInMonths);
    const days = Math.abs(differenceInDays);

    let result = '';

    if (months > 0) {
      result += `${months} month${months > 1 ? 's' : ''}`;
    }

    if (days > 0) {
      if (result.length > 0) result += ' ';
      result += `${days} day${days > 1 ? 's' : ''}`;
    }

    if (result.length === 0) {
      result = 'N/A';
    }

    return result;
  };

  // Use useMemo to optimize performance by memoizing the result
  return useMemo(() => calculateDuration(currentDateStr, expiryDateStr), [currentDateStr, expiryDateStr]);
};

export default useProjectDuration;
