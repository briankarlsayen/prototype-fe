import React, { useState } from 'react';
import { routesPostApi } from '../../../api/apis';
import SelectInput from '../../../globalComponents/SelectInput';

const Encryption = () => {
  const encryptionTypes = ['AES', 'RSA'];

  const [spinAction, setSpinAction] = useState({
    generateKey: false,
    encrypt: false,
    decrypt: false,
  });
  const [inputText, setInputText] = useState({
    pubKey: '',
    privKey: '',
    text: '',
    encryptedText: '',
  });
  const [encType, setEncType] = useState(encryptionTypes[0]);
  const [encryptKeys, setEncriptKeys] = useState({
    privateKey: '',
    publicKey: '',
  });
  const [outputs, setOutputs] = useState({
    encrypt: '',
    decrypt: '',
  });

  const updateField = (e: any) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    });
  };

  const updateEncryptType = (e: any) => {
    setEncType(e.target.value);
  };

  const generateKey = async () => {
    setSpinAction({ ...spinAction, generateKey: true });
    const response = await routesPostApi({
      routeName: '/api/encryption/generatekey',
    });
    const { privateKey, publicKey } = response.data;
    setEncriptKeys({
      privateKey,
      publicKey,
    });
    setSpinAction({ ...spinAction, generateKey: false });
  };

  const updateKeys = (e: any) => {
    setEncriptKeys({
      ...encryptKeys,
      [e.target.name]: e.target.value,
    });
  };

  const submitEncryptHandler = async (e: any) => {
    e.preventDefault();
    setSpinAction({ ...spinAction, encrypt: true });
    const params = {
      pubKey: inputText.pubKey,
      data: inputText.text,
      type: encType,
    };
    try {
      const response = await routesPostApi({
        routeName: '/api/encryption/encrypt',
        params,
      });
      console.log('response', response);
      const { encryptedData } = response.data;
      setOutputs({ ...outputs, encrypt: encryptedData });
    } catch (error) {
      console.log('error', error);
    }
    setSpinAction({ ...spinAction, encrypt: false });
  };

  const submitDecryptHandler = async (e: any) => {
    e.preventDefault();
    setSpinAction({ ...spinAction, decrypt: true });
    const params = {
      privKey: inputText.privKey,
      data: inputText.encryptedText,
      type: encType,
    };
    try {
      const response = await routesPostApi({
        routeName: '/api/encryption/decrypt',
        params,
      });
      console.log('response', response);
      const { decryptedData } = response.data;
      setOutputs({ ...outputs, decrypt: decryptedData });
    } catch (error) {
      console.log('error', error);
    }
    setSpinAction({ ...spinAction, decrypt: false });
  };

  const updateOutputs = (e: any) => {
    setOutputs({
      ...outputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className='dark:bg-slate-700 rounded-md p-4 h-fit border border-gray-500 max-w-3xl mb-8'>
        <h2 className='mb-4'>Params</h2>
        <hr className='mb-4' />
        <div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Encryption Type</span>
            </label>
            {/* <select
              className='select select-bordered w-full max-w-xs'
              name='type'
              required
              onChange={updateEncryptType}
            >
              <option disabled defaultValue='AES'>
                Encryption type
              </option>
              <option value='AES'>AES</option>
              <option defaultValue='RSA' value='RSA'>
                RSA
              </option>
            </select> */}
            <SelectInput
              onchange={updateEncryptType}
              label='Encryption Type'
              options={encryptionTypes}
              value={encType}
            />
          </div>
          <div className={`${encType === 'RSA' ? 'block' : 'hidden'}`}>
            <div className='flex gap-4'>
              <div className='form-control w-full max-w-sm'>
                <label className='label'>
                  <span className='label-text'>Private key</span>
                </label>
                <textarea
                  className='textarea textarea-bordered'
                  name='privateKey'
                  value={encryptKeys.privateKey}
                  onChange={updateKeys}
                ></textarea>
              </div>
              <div className='form-control w-full max-w-sm'>
                <label className='label'>
                  <span className='label-text'>Public key</span>
                </label>
                <textarea
                  className='textarea textarea-bordered'
                  name='publicKey'
                  value={encryptKeys.publicKey}
                  onChange={updateKeys}
                ></textarea>
              </div>
            </div>
            <button
              className={`btn btn-info mt-4 w-fit ${
                spinAction.generateKey && 'loading'
              }`}
              onClick={generateKey}
            >
              Generate key
            </button>
          </div>
        </div>
      </div>
      <div className='flex md:flex-row flex-col gap-8 md:gap-16 min-h-full'>
        <div className='basis-1/2 dark:bg-slate-700 rounded-md p-4 h-fit border border-gray-500'>
          <h2 className='mb-4'>Encryption</h2>
          <hr className='mb-4' />
          <form className='flex flex-col' onSubmit={submitEncryptHandler}>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Text</span>
              </label>
              <input
                type='text'
                placeholder='Text'
                name='text'
                value={inputText.text}
                onChange={updateField}
                className='socket-input max-w-lg'
                required
              />
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>
                  {encType === 'RSA' ? 'Public key' : 'Secret key'}
                </span>
              </label>
              <input
                type='text'
                placeholder='super-secret-key'
                name='pubKey'
                value={inputText.pubKey}
                onChange={updateField}
                className='socket-input max-w-lg'
                required
              />
            </div>

            <button
              type='submit'
              className={`btn btn-info mt-8 mb-2 w-fit ${
                spinAction.encrypt && 'loading'
              }`}
            >
              Encrypt
            </button>
          </form>
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text'>Output</span>
            </label>
            <textarea
              className='textarea textarea-bordered'
              value={outputs.encrypt}
              onChange={updateOutputs}
            ></textarea>
          </div>
        </div>
        <div className='basis-1/2 dark:bg-slate-700 rounded-md p-4 h-fit border border-gray-500'>
          <h2 className='mb-4'>Decryption</h2>
          <hr className='mb-4' />
          <form className='flex flex-col' onSubmit={submitDecryptHandler}>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Encrypted text</span>
              </label>
              <input
                type='text'
                placeholder='Text'
                name='encryptedText'
                onChange={updateField}
                className='socket-input max-w-lg'
                required
              />
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>
                  {encType === 'RSA' ? 'Private key' : 'Secret key'}
                </span>
              </label>
              <input
                type='text'
                placeholder='super-secret-key'
                name='privKey'
                onChange={updateField}
                className='socket-input max-w-lg'
                required
              />
            </div>

            <button
              type='submit'
              className={`btn btn-info mt-8 mb-2 w-fit ${
                spinAction.decrypt && 'loading'
              }`}
            >
              Decrypt
            </button>
          </form>
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text'>Output</span>
            </label>
            <textarea
              className='textarea textarea-bordered'
              value={outputs.decrypt}
              onChange={updateOutputs}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Encryption;
