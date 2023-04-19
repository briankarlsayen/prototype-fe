import { useEffect, useState } from 'react';
import { routesPostApi } from '../../../api/apis';
import axios, { AxiosError } from 'axios';
import SelectInput from '../../../globalComponents/SelectInput';
import FormDataInput from '../../../globalComponents/FormDataInput';
import { FaPlus } from 'react-icons/fa';

interface ApiOptions {
  params: any;
}

interface IReqApiError extends Error {
  code: any;
}

// TODO generate new objInputs

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
  // const [paramsArr, setParamsArr] = useState([{ name: '', key: '', val: 'q' }]);

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
      const paramsArr = objKeyVal.map((val) => {
        return {
          [val.val1]: val.val2,
        };
      });

      const params = paramsArr.reduce((result, currentObj) => {
        return Object.assign(result, currentObj);
      }, {});

      console.log('params', params);

      // let res = await reqApi({ params });
      // if (res) {
      //   setResult(res?.data);
      // }
      console.log('objKeyVal', objKeyVal);
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

  const updateParamsField = (e: any) => {
    console.log('e.target.name', e.target.name);
    const splitName = e.target.name.split('-');
    // console.log('splitName', splitName);
    const objPropery = splitName.pop();

    const val: string = e.target.value;

    const joinedName = splitName.join('-');

    console.log('joinedName', joinedName);
    console.log('val', val);
    console.log('objPropery', objPropery);

    const idx = objKeyVal.findIndex((el) => el.title === joinedName);
    if (idx === -1) return null;
    const obj = objKeyVal[idx];
    switch (objPropery) {
      case 'name1':
        obj.name1 = val;
        break;
      case 'name2':
        obj.name2 = val;
        break;
      case 'val1':
        obj.val1 = val;
        break;
      case 'val2':
        obj.val2 = val;
        break;
    }

    console.log('obj', obj);

    // * check if obj name exist
    console.log('idx', idx);
    const newArr = objKeyVal;
    newArr.splice(idx, 0);
    console.log('newArr', newArr);
    setObjectKeyVal(newArr);
    // if (idx === -1) {
    //   // * create
    //   setObjectKeyVal([...objKeyVal, obj]);
    // } else {
    //   // * update
    //   const newArr = objKeyVal;
    //   newArr.splice(idx, 0);
    //   setObjectKeyVal(newArr);
    // }

    // const idx = paramsArr.findIndex((el) => el.name === joinedName);
    // const obj = paramsArr[idx] ?? { name: joinedName, key: '', val: '' };
    // switch (objPropery) {
    //   case 'key':
    //     obj.key = val;
    //     break;
    //   case 'val':
    //     obj.val = val;
    //     break;
    // }

    // // * check if obj name exist
    // if (idx === -1) {
    //   // * create
    //   setParamsArr([...paramsArr, obj]);
    // } else {
    //   // * update
    //   const newArr = paramsArr;
    //   newArr.splice(idx, 0);
    //   setParamsArr(newArr);
    // }
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
      val1: `${uuid}-val1`,
      name2: `${uuid}-name2`,
      val2: `${uuid}-val2`,
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

  console.log('objKeyVal', objKeyVal);

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

          {/* <div className='form-control'>
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
          </div> */}
          <div>
            <div className='flex justify-around'>
              <label>key</label>
              <label>value</label>
            </div>
            {objKeyVal.map((el, i) => {
              return (
                <FormDataInput
                  key={el.title}
                  name1={el.name1}
                  name2={el.name2}
                  val1={el.val1}
                  val2={el.val2}
                  updateParamsField={updateParamsField}
                />
              );
            })}
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
