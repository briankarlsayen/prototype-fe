import { useState } from 'react';
import { routesPostApi } from '../../../api/apis';
const ApiTester = () => {
  const [inputText, setInputText] = useState({
    username: '',
    password: '',
  });
  const [spinAction, setSpinAction] = useState(false);
  const [result, setResult] = useState('');
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSpinAction(true);
    const res = await routesPostApi({
      routeName: '/api/auth/login',
      params: {
        username: inputText.username,
        password: inputText.password,
      },
    });
    console.log('res', res);
    // setResult(res);
    setSpinAction(false);
  };

  const updateField = (e: any) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className='flex gap-4 h-full'>
      <div className='dark:bg-slate-700 rounded-md p-4 border border-gray-500 mb-8 basis-1/3'>
        <h2 className='mb-4'>Params</h2>
        <hr className='mb-4' />
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Username</span>
            </label>
            <div>
              <input
                type='text'
                name='username'
                onChange={updateField}
                required
              />
            </div>
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Password</span>
            </label>
            <input
              type='text'
              name='password'
              onChange={updateField}
              className='socket-input'
              required
            />
          </div>
          <button
            type='submit'
            className={`btn btn-info mt-8 mb-2 ${spinAction && 'loading'}`}
          >
            Set
          </button>
        </form>
      </div>
      <div className='dark:bg-slate-700 rounded-md p-4 border border-gray-500 mb-8 basis-2/3'>
        <h2 className='mb-4'>Result</h2>
        <hr className='mb-4' />
        <p>{result}</p>
      </div>
    </div>
  );
};

export default ApiTester;
