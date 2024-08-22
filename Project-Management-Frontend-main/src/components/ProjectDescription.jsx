// ProjectDescription.js

import React from 'react';
import PropTypes from 'prop-types';

const ProjectDescription = ({ description }) => {
  return (
    <div className="project-description self-stretch rounded-smi bg-lavender flex flex-row items-start justify-center py-14 pr-5 pl-[21px] box-border max-w-full z-[1]
     ">
      description
      <p>{description}</p> 
      
    </div>
  );
};

ProjectDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

export default ProjectDescription;
