import React from 'react';

interface Props {
  isDeletingAlert: boolean;
}

const DeletingAlert: React.FC<Props> = ({ isDeletingAlert }) => {
  return (
    <div>
      {isDeletingAlert && <div className='alert alert-danger'>Deleting...</div>}
    </div>
  );
};

export default DeletingAlert;
