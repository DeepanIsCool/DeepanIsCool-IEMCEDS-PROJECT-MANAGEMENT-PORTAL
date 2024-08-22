// Faculties.js

import React from 'react';
import PropTypes from 'prop-types';

const Faculties = ({ faculties }) => {
  return (
    <div className="faculties self-stretch rounded-smi bg-lavender flex flex-row items-start justify-center py-14 pr-5 pl-[21px] box-border max-w-full z-[1]">
      <h1>Faculties</h1>
      <div className="faculty-images">
        {faculties.map((faculty, index) => (
          <img key={index} src={faculty} alt={`Faculty ${index + 1}`} className="faculty-image" />
        ))}
      </div>
    </div>
  );
};

Faculties.propTypes = {
  faculties: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Faculties;
