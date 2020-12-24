import React from 'react';
import './Search.css';

const Search = () => {
  return (
    <div>
      <div className='row'>
        <div className='col-md-12'>
          <div className='form-group'>
            <input
              id='search'
              name='search'
              className='"form-control text-center'
              placeholder='Search'
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
