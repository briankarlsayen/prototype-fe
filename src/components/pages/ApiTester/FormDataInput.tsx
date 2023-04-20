import React from 'react';

const FormDataInput = ({
  index,
  name1,
  name2,
  val1,
  val2,
  updateParamsField,
}: any) => {
  return (
    <div className='flex gap-2 justify-between'>
      <div className='form-control'>
        <input
          type='text'
          name={name1}
          value={val1}
          onChange={(e) => updateParamsField(e, index)}
          className='socket-input'
          required
        />
      </div>
      <div className='form-control'>
        <input
          type='text'
          name={name2}
          value={val2}
          onChange={(e) => updateParamsField(e, index)}
          className='socket-input'
          required
        />
      </div>
    </div>
  );
};

export default FormDataInput;
