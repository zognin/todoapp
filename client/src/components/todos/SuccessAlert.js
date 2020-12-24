import React from 'react';

const SuccessAlert = ({ isSuccessAlert }) => {
  return (
    <div>
      {isSuccessAlert && <div className='alert alert-success'>Saving...</div>}
    </div>
  );
};

export default SuccessAlert;
