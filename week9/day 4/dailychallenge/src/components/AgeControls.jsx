import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ageDownAsync, ageUpAsync } from '../redux/ageSlice.js';

export default function AgeControls() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.age.loading);

  const onAgeUp = () => {
    dispatch(ageUpAsync());
  };

  const onAgeDown = () => {
    dispatch(ageDownAsync());
  };

  return (
    <div className="controls">
      <button className="btn-up" type="button" onClick={onAgeUp} disabled={loading}>
        Age Up
      </button>
      <button className="btn-down" type="button" onClick={onAgeDown} disabled={loading}>
        Age Down
      </button>
    </div>
  );
}

