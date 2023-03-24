import { useState } from 'react';

const Encryption = () => {
  const [inputText, setInputText] = useState({
    url: '',
    room: '',
  });
  const [spinAction, setSpinAction] = useState(false);

  const updateField = (e: any) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {};
  return (
    <div className='flex gap-4 min-h-full'>
      <div className='basis-1/2 dark:bg-slate-700 rounded-md p-4 h-fit border border-gray-500'>
        <h2 className='mb-4'>Encryption:</h2>
        <hr className='mb-4' />
        <div className='flex flex-col gap-4'>
          <form className='flex flex-col' onSubmit={handleSubmit}>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Type</span>
              </label>
              <select className='select select-bordered w-full max-w-xs'>
                <option disabled defaultValue='RSA'>
                  Encryption type
                </option>
                <option>RSA</option>
                <option>AES</option>
              </select>
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Secret key</span>
              </label>
              <input
                type='text'
                placeholder='super-secret-key'
                name='room'
                onChange={updateField}
                className='input input-bordered w-full max-w-xs'
                required
              />
            </div>
            <button
              type='submit'
              className={`btn btn-info mt-8 mb-2 ${spinAction && 'loading'}`}
            >
              Encypt
            </button>
          </form>
          <div className='flex justify-between'>
            <h2 className='mb-4'>Results:</h2>
          </div>
        </div>
      </div>
      <div className='basis-1/2 dark:bg-slate-700 rounded-md p-4 border border-gray-500'>
        <div className='flex justify-between'>
          <h2 className='mb-4'>Results:</h2>
        </div>
        <hr className='mb-4' />
      </div>
    </div>
  );
};

export default Encryption;
