import React, { useState } from 'react';
import { api } from '../ApiTester/RequestHandler';
import SelectInput from '../../../globalComponents/SelectInput';

interface IScreenshotInput {
  url: string;
  fullpage: boolean;
  width: number;
  height: number;
}

const BASE_URL =
  'https://pw-web-scrape-git-master-briankarlsayen.vercel.app/screenshot';

const ScreenShoter = () => {
  const [spinAction, setSpinAction] = useState(false);
  const [inputField, setInputField] = useState<IScreenshotInput>({
    url: '',
    fullpage: true,
    height: 250,
    width: 600,
  });
  const [isSuccess, setSuccess] = useState(false);
  const [resultField, setResultField] = useState({
    image: '',
    title: '',
    description: '',
  });
  const [selectInput, setSelectInput] = useState('fullpage');

  const updateField = (e: any) => {
    setInputField({
      ...inputField,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    setSpinAction(true);
    setSuccess(false);
    await screenshotApi();
    setSpinAction(false);
  };

  const screenshotApi = async () => {
    try {
      const params = { ...inputField };
      const res = await api({ url: BASE_URL, method: 'POST', params });
      setResultField(res);
      setSuccess(true);
    } catch (err) {
      console.log('err', err);
    }
  };
  const updateSelectVal = (e: any) => {
    setSelectInput(e.target.value);
    switch (e.target.value) {
      case 'fullpage':
        setInputField({ ...inputField, fullpage: true });
        break;
      case 'clip':
        setInputField({ ...inputField, fullpage: false });
        break;
    }
  };

  const options = ['fullpage', 'clip'];

  return (
    <div className='flex lg:flex-row flex-col gap-4 h-full'>
      <div className='dark:bg-slate-700 min-w-[20rem] rounded-md p-4 border border-gray-500 mb-8 basis-1/3'>
        <h2 className='mb-4'>Params</h2>
        <hr className='mb-4' />
        <form className='flex flex-col' onSubmit={submitHandler}>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Url</span>
            </label>
            <input
              type='text'
              name='url'
              className='input input-bordered w-full'
              value={inputField.url}
              onChange={updateField}
              required
            />
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Size</span>
            </label>
            <SelectInput
              onchange={updateSelectVal}
              label='Screenshot size'
              options={options}
              value={selectInput}
            />
          </div>
          {!inputField.fullpage && (
            <div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Height</span>
                </label>
                <input
                  type='number'
                  name='height'
                  className='input input-bordered w-full'
                  value={inputField.height}
                  onChange={updateField}
                  required
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Width</span>
                </label>
                <input
                  type='number'
                  name='width'
                  className='input input-bordered w-full'
                  value={inputField.width}
                  onChange={updateField}
                  required
                />
              </div>
            </div>
          )}

          <button
            type='submit'
            className={`btn btn-info mt-8 mb-2 ${spinAction && 'loading'}`}
          >
            Send
          </button>
        </form>
      </div>
      <div className='dark:bg-slate-700 rounded-md p-4 border border-gray-500 mb-8 basis-2/3'>
        {isSuccess && (
          <div>
            <img className='bg-white' src={resultField.image} />
            <p>Title: {resultField.title}</p>
            <p>Description: {resultField.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScreenShoter;
