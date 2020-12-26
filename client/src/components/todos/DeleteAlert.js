import React from 'react';

const DeleteAlert = ({ isDeleteAlert, handleDelete, setIsDeleteAlert }) => {
  return (
    <div>
      {isDeleteAlert && (
        <div className='alert alert-secondary'>
          <h5 className='alert-heading'>Delete this task?</h5>
          <p>You will not be able to undo this action</p>
          <hr />
          <button className='btn btn-primary' onClick={handleDelete}>
            Yes
          </button>
          <button
            className='btn btn-dark'
            onClick={() => {
              setIsDeleteAlert(false);
            }}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteAlert;
