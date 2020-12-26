import React from 'react';

const DeletingAlert = ({ isDeletingAlert }) => {
  return (
    <div>
      {isDeletingAlert && <div className='alert alert-danger'>Deleting...</div>}
    </div>
  );
};

export default DeletingAlert;
