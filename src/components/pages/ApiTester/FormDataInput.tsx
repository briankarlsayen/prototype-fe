import { FaMinus } from 'react-icons/fa';

const FormDataInput = ({
  len,
  index,
  name1,
  name2,
  val1,
  val2,
  updateParamsField,
  removeInputField,
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
      <div className='w-4 flex items-center'>
        {len > 1 ? (
          <FaMinus
            className='hover:text-gray-500 cursor-pointer'
            onClick={() => removeInputField(index)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default FormDataInput;
