import React, { useState, useReducer, useEffect } from 'react';
import Watch from './Watch';
import WatchForm from './WatchForm';

const watchesInitialState = [];

const dateWithOffset = (date, offset, inplace = false) => {
  if (!inplace) {
    date = new Date(date);
  }
  date.setMinutes(date.getMinutes() + offset);
  return date;
};

const nowUTC = () => {
  const date = new Date();
  return dateWithOffset(date, date.getTimezoneOffset(), true);
};

const watchesReducer = (state, action) => {
  switch (action.type) {
    case 'addWatch': {
      const watch = action.payload;
      return [...state, watch];
    }
    case 'deleteWatch': {
      const watchId = action.payload;
      const index = state.findIndex(({ id }) => id === watchId);
      if (index === -1) {
        return state;
      }
      state.splice(index, 1);
      return [...state];
    }
    default:
      return state;
  }
};

const Watches = () => {
  const [watches, dispatch] = useReducer(watchesReducer, watchesInitialState);
  const [now, setNow] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(nowUTC());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDelete = (id) => {
    dispatch({ type: 'deleteWatch', payload: id });
  };

  const handleAdd = (watch) => {
    dispatch({type: 'addWatch', payload: watch});
  };

  if (now == null) {
    return;
  }

  const watchElements = watches.map(({ id, name, offset }) => (
    <Watch
      key={id}
      name={name}
      date={dateWithOffset(now, offset)}
      onDelete={() => handleDelete(id)}
    />
  ));

  return (
    <div>
      <WatchForm onAdd={handleAdd}/>
      <div>{watchElements}</div>
    </div>
  );
};

export default Watches;
