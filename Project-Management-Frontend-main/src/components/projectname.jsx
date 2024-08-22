

import React from 'react';
import PropTypes from 'prop-types';

const projectname = ({ name }) => {
  return (
    <div className="project-description self-stretch rounded-smi bg-lavender flex flex-row items-start justify-center py-14 pr-5 pl-[21px] box-border max-w-full z-[1]
     ">
      name
      <p>{name}</p>
    </div>
  );
};

projectname.propTypes = {
  projectname: PropTypes.string.isRequired,
};

export default projectname;
