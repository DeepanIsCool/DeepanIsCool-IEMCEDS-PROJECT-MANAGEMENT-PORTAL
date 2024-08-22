import { useMemo } from 'react';

const useFormatData = (isoDateString) => {
  const formattedDate = useMemo(() => {
    if (!isoDateString) return '';

    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
    const year = String(date.getFullYear()).slice(2); // get last two digits of year

    return `${day}-${month}-${year}`;
  }, [isoDateString]);

  return formattedDate;
};

export default useFormatData;