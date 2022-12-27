import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  onDelete: PropTypes.func,
};

const Watch = ({ name, date, onDelete }) => {
  const hourArrowStyle = { transform: `rotate(${date.getHours() * 30}deg)` };
  const minuteArrowStyle = { transform: `rotate(${date.getMinutes() * 6}deg)` };
  const secondArrowStyle = { transform: `rotate(${date.getSeconds() * 6}deg)` };
  console.log(hourArrowStyle, minuteArrowStyle, date);

  const deleteButton = onDelete == null || (
    <button className="watch__delete-button" onClick={onDelete}>
      X
    </button>
  );

  return (
    <div className='watch'>
      {name}
      <div className="watch__inner">
        <div className="arrow arrow_hour" style={hourArrowStyle} />
        <div className="arrow arrow_minute" style={minuteArrowStyle} />
        <div className="arrow arrow_second" style={secondArrowStyle} />
        {deleteButton}
      </div>
    </div>
  );
};

Watch.propTypes = propTypes;

export default Watch;
