import { useEffect, useState } from 'react';
import SelectInput from '../../../globalComponents/SelectInput';
import FormDataInput from './FormDataInput';
import { FaPlus } from 'react-icons/fa';
import { api } from './RequestHandler';

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
  const [objKeyVal, setObjectKeyVal] = useState([
    { title: '', name1: '', val1: '', name2: '', val2: '' },
  ]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setSpinAction(true);
      setResult({});
      const paramsArr = objKeyVal.map((val) => {
        return {
          [val.val1]: val.val2,
        };
      });

      const params = paramsArr.reduce((result, currentObj) => {
        return Object.assign(result, currentObj);
      }, {});

      const res = await api({ url: inputText.url, method, params });
      setResult(res);
      setSpinAction(false);
    } catch (_e) {
      console.log('_e', _e);
      setSpinAction(false);
    }
  };

  const updateField = (e: any) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    });
  };

  const getInputName = (name: string) => {
    const nameArr = name.split('-');
    return nameArr.pop();
  };

  const updateParamsField = (e: any, index: number) => {
    const { target } = e;
    const { value, name } = target;
    const newArr = [...objKeyVal];
    const inputName = getInputName(name);
    inputName === 'name1' ? (newArr[index].val1 = value) : null;
    inputName === 'name2' ? (newArr[index].val2 = value) : null;
    setObjectKeyVal(newArr);
  };

  function generateUUID() {
    var d = new Date().getTime();
    var d2 =
      (typeof performance !== 'undefined' &&
        performance.now &&
        performance.now() * 1000) ||
      0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  const generateKeyValName = () => {
    const uuid = generateUUID();
    return {
      title: uuid,
      name1: `${uuid}-name1`,
      val1: '',
      name2: `${uuid}-name2`,
      val2: '',
    };
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

  useEffect(() => {
    setObjectKeyVal([generateKeyValName()]);
  }, []);

  const newInputFormHandler = () => {
    console.log('[...objKeyVal, generateKeyValName()]', [
      ...objKeyVal,
      generateKeyValName(),
    ]);
    setObjectKeyVal([...objKeyVal, generateKeyValName()]);
  };

  return (
    <div className='flex gap-4 h-full'>
      <div className='dark:bg-slate-700 min-w-[20rem] rounded-md p-4 border border-gray-500 mb-8 basis-1/3'>
        <h2 className='mb-4'>Params</h2>
        <hr className='mb-4' />
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Url</span>
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
              label='Request Method'
              options={apiMethods}
              value={method}
            />
          </div>
          <div>
            <div className='flex justify-around label-text'>
              <label className='label'>
                <span className='label-text'>key</span>
              </label>
              <label className='label'>
                <span className='label-text'>value</span>
              </label>
            </div>
            <div className='flex flex-col gap-2'>
              {objKeyVal.length
                ? objKeyVal.map((el, i) => {
                    return (
                      <FormDataInput
                        key={el.title}
                        index={i}
                        name1={el.name1}
                        name2={el.name2}
                        val1={el.val1}
                        val2={el.val2}
                        updateParamsField={updateParamsField}
                      />
                    );
                  })
                : null}
            </div>
          </div>
          <button
            type='button'
            className='btn btn-primary w-fit mt-4'
            onClick={newInputFormHandler}
          >
            <FaPlus />
            Add
          </button>
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
