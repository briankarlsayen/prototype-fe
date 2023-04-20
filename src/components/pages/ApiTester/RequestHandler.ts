import axios from 'axios';

interface ApiOptions {
  params: any;
  url: string;
  method: string;
}

interface IReqApiError extends Error {
  code: any;
  response: any;
}

const reqApi = async ({ url, method, params }: ApiOptions) => {
  switch (method) {
    case 'POST':
      return await axios.post(`${url}`, params);
    case 'GET':
      console.log('get');
      return await axios.get(`${url}`, params);
    case 'PUT':
      return await axios.put(`${url}`, params);
    default:
      console.log('Invalid method', method);
      return null;
  }
};

export const api = async ({ url, method, params }: ApiOptions) => {
  try {
    let res = await reqApi({ url, method, params });
    if (res) {
      return res?.data;
    }
  } catch (_e) {
    const err = _e as IReqApiError;
    console.log('_e', _e);
    if (err?.response?.data.message)
      return { message: err?.response?.data.message };
    return {
      error: err?.code,
      message: err?.message,
      // name: err?.name,
      hint: 'Check you url',
      response: err?.response?.data.message,
    };
  }
};
