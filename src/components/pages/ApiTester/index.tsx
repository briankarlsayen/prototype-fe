import { useState } from 'react';
import { routesPostApi } from '../../../api/apis';
import axios, { AxiosError } from 'axios';
import SelectInput from '../../../globalComponents/SelectInput';
import FormDataInput from '../../../globalComponents/FormDataInput';

interface ApiOptions {
  params: any;
}

interface IReqApiError extends Error {
  code: any;
}

const ApiTester = () => {
  const apiMethods = ['POST', 'GET', 'PUT'];
  const [inputText, setInputText] = useState({
    url: '',
    username: '',
    password: '',
  });
  const [spinAction, setSpinAction] = useState(false);
  const [result, setResult] = useState({});
  const [method, setMethod] = useState(apiMethods[0]);

  const reqApi = async ({ params }: ApiOptions) => {
    console.log('method', method);
    switch (method) {
      case 'POST':
        console.log('pot');
        return await routesPostApi({
          routeName: `${inputText?.url}/api/auth/login`,
          params,
        });
        return await axios.post(`${inputText?.url}/api/auth/login`, params);
      case 'GET':
        console.log('get');
        return await axios.get(`${inputText?.url}/api/auth/login`, params);
      case 'PUT':
        return await axios.put(`${inputText?.url}/api/auth/login`, params);
      default:
        console.log('Invalid method', method);
        return null;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setSpinAction(true);
      setResult({});

      const params = {
        username: inputText.username,
        password: inputText.password,
      };

      let res = await reqApi({ params });
      if (res) {
        setResult(res?.data);
      }
      setSpinAction(false);
    } catch (_e) {
      const err = _e as IReqApiError;
      setSpinAction(false);
      if (err?.code === 'ERR_BAD_REQUEST') {
        setResult({
          error: err?.code,
          message: err?.message,
          name: err?.name,
        });
      }
    }
  };

  const updateField = (e: any) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    });
  };

  const displaySocketRes = () => {
    return (
      <ul className='text-white text-sm'>
        <pre className='break-all whitespace-pre-wrap'>
          {result && Object.entries(result).length !== 0
            ? `${JSON.stringify(result, null, 2)}`
            : ''}
        </pre>
      </ul>
    );
  };

  const updateSelectVal = (e: any) => {
    setMethod(e.target.value);
  };

  return (
    <div className='flex gap-4 h-full'>
      <div className='dark:bg-slate-700 min-w-[20rem] rounded-md p-4 border border-gray-500 mb-8 basis-1/3'>
        <h2 className='mb-4'>Params</h2>
        <hr className='mb-4' />
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Base url</span>
            </label>
            <div>
              <input type='text' name='url' onChange={updateField} required />
            </div>
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Method</span>
            </label>
            <SelectInput
              onchange={updateSelectVal}
              label='Encryption Type'
              options={apiMethods}
              value={method}
            />
          </div>

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
          {/* <div>
            <div className='flex justify-around'>
              <label>username</label>
              <label>username</label>
            </div>
            <FormDataInput keyVal={'username'} value={'username'} />
          </div> */}
          <button
            type='submit'
            className={`btn btn-info mt-8 mb-2 ${spinAction && 'loading'}`}
          >
            Send
          </button>
        </form>
      </div>
      <div className='dark:bg-slate-700 rounded-md p-4 border border-gray-500 mb-8 basis-2/3'>
        <h2 className='mb-4'>Response</h2>
        <hr className='mb-4' />
        {displaySocketRes()}
      </div>
    </div>
  );
};

export default ApiTester;
