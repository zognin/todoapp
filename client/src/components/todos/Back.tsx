import React from 'react';
import { useHistory } from 'react-router-dom';

const Back = () => {
  let history = useHistory();
  const handleBack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    history.goBack();
  };
  return (
    <>
      <button type='submit' className='btn btn-info' onClick={handleBack}>
        Back
      </button>
    </>
  );
};

export default Back;
