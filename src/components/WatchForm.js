import React, { useState } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

const propTypes = {
  disabled: PropTypes.bool,
  onAdd: PropTypes.func,
};

const defaultProps = {
  disabled: false,
};

const WatchForm = ({ disabled, onAdd }) => {
  const [name, setName] = useState('');
  const [hourOffset, setHourOffset] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const hourOffsetFloat = parseFloat(hourOffset);
    if (!isFinite(hourOffsetFloat)) {
      return;
    }
    // разрешены смещения на 30 минут
    const offset = 30 * Math.round(2 * hourOffsetFloat);
    const watch = { id: shortid(), name, offset };
    setName('');
    setHourOffset('');
    onAdd?.(watch);
  };

  return (
    <form className="watch-form" onSubmit={handleSubmit}>
      <label className='watch-form__input-wrap'>
        <span className='watch-form__label'>Название</span>
        <input
          className="watch-form__input watch-form__input_name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label className='watch-form__input-wrap'>
        <span className='watch-form__label'>Временная зона</span>
        <input
          className="watch-form__input watch-form__input_offset"
          type="number"
          value={hourOffset}
          onChange={(event) => setHourOffset(event.target.value)}
        />
      </label>
      <button className="watch-form__button" disabled={disabled}>
        Добавить
      </button>
    </form>
  );
};

WatchForm.propTypes = propTypes;
WatchForm.defaultProps = defaultProps;

export default WatchForm;
