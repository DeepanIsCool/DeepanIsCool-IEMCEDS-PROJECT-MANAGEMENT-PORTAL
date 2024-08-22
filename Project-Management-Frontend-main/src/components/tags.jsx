

import React from 'react';
import PropTypes from 'prop-types';

const Tags = ({ tags }) => {
  return (
    <div className="tagsself-stretch rounded-smi bg-lavender flex flex-row items-start justify-center py-14 pr-5 pl-[21px] box-border max-w-full z-[1]">
      <h1>Tags</h1>
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
    </div>
  );
};

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Tags;
