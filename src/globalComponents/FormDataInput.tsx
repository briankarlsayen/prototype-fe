import React from 'react';

const FormDataInput = ({ keyVal, value }: any) => {
  return (
    <div className='flex gap-2 justify-between'>
      <div className='form-control'>
        <input
          type='text'
          name={keyVal}
          value={keyVal}
          // onChange={}
          className='socket-input'
          required
        />
      </div>
      <div className='form-control'>
        <input
          type='text'
          name={value}
          value={value}
          // onChange={}
          className='socket-input'
          required
        />
      </div>
    </div>
  );
};

export default FormDataInput;
