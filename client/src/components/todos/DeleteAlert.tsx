import React from 'react';

interface Props {
  isDeleteAlert: boolean;
  handleDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  setIsDeleteAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteAlert: React.FC<Props> = ({
  isDeleteAlert,
  handleDelete,
  setIsDeleteAlert,
}) => {
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
