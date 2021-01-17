import React from 'react';

interface Props {
  isSuccessAlert: boolean;
}

const SuccessAlert: React.FC<Props> = ({ isSuccessAlert }) => {
  return (
    <div>
      {isSuccessAlert && <div className='alert alert-success'>Saving...</div>}
    </div>
  );
};

export default SuccessAlert;
