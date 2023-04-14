import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

interface Socket {
  on(event: string, callback: (data: any) => void): any;
  emit(event: string, data: any): any;
}

interface SocketConnect {
  message?: string;
  success?: boolean;
  data?: Socket;
}
interface SocketSettings {
  url: string;
  room: string;
}

const SocketDisplay = () => {
  const [datas, setDatas] = useState<Array<{ key: 'string'; value: 'string' }>>(
    []
  );
  const [online, setOnline] = useState(false);
  const [useSocket, setUseSocket] = useState<SocketConnect>();
  const [inputText, setInputText] = useState<SocketSettings>({
    url: '',
    room: '',
  });
  const [socketCon, setSocketCon] = useState<SocketSettings>();
  const [socketErr, setSocketErr] = useState(false);
  const [spinAction, setSpinAction] = useState(false);
  const [callback, setCallback] = useState(false);
  const [message, setMessage] = useState('');
  const [isSender, setSender] = useState(false);

  const updateField = (e: any) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    });
    setSocketErr(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSocketCon(inputText);
    setCallback(!callback);
  };

  useEffect(() => {
    if (socketCon?.url) {
      initializeSocket();
    }
  }, [callback]);

  useEffect(() => {
    if (online) {
      console.log('online...');
      getActiveOrders();
    }
  }, [online]);

  const delay = (delayInms: number) => {
    return new Promise((resolve) => setTimeout(resolve, delayInms));
  };

  const connectToSocket = async () => {
    setSpinAction(true);
    const socketRes = io(socketCon ? socketCon.url : '', {
      transports: ['websocket', 'polling'],
    });
    await delay(3000);
    setSpinAction(false);
    if (!socketRes.connected) {
      socketRes.disconnect();
      return new Error('Unable to connect to socket');
    }
    return {
      success: true,
      data: socketRes,
    };
  };

  const initializeSocket = async () => {
    const response: SocketConnect = await connectToSocket();
    setUseSocket(undefined);
    if (response.message) {
      setSocketErr(true);
      setSocketCon(undefined);
      return console.log('err', response.message);
    }
    setUseSocket(response);
    setOnline(true);
  };

  const getActiveOrders = async () => {
    await useSocket?.data?.on(
      socketCon ? socketCon.room : '',
      async (data: any) => {
        if (data) {
          console.log('data', data);
          return setDatas((prevArr) => [data, ...(prevArr ?? [])]);
        }
      }
    );
  };

  const connectionBadge = () => {
    return useSocket?.success ? (
      <div className='badge badge-success'>Connected</div>
    ) : (
      <div className='badge badge-error'>No connection</div>
    );
  };

  const displaySocketRes = () => {
    return (
      <ul className='text-white text-sm'>
        <pre>{datas.length ? `${JSON.stringify(datas, null, 2)},` : ''}</pre>
      </ul>
    );
  };

  const handleSubmitMessage = (e: any) => {
    e.preventDefault();
    useSocket?.data?.emit(inputText.room, message);
    setMessage('');
  };

  return (
    <div className='flex gap-4 min-h-full'>
      <div className='basis-1/3 dark:bg-slate-700 rounded-md p-4 h-fit border border-gray-500'>
        <h2 className='mb-4'>Socket URL:</h2>
        <hr className='mb-4' />
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>URL</span>
            </label>
            <div
              className={socketErr ? 'tooltip tooltip-open tooltip-error' : ''}
              data-tip='Invalid url'
            >
              <input
                type='text'
                placeholder='Socket URL'
                name='url'
                onChange={updateField}
                className={socketErr ? 'socket-input-err ' : 'socket-input '}
                required
              />
            </div>
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Room</span>
            </label>
            <input
              type='text'
              placeholder='Room'
              name='room'
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
      <div className='basis-2/3 dark:bg-slate-700 rounded-md p-4 border border-gray-500'>
        <div className='flex justify-between'>
          <h2 className='mb-4'>Results:</h2>
          {connectionBadge()}
        </div>
        <hr className='mb-4' />
        <div className='flex pb-4'>
          <div className='relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in'>
            <input
              type='checkbox'
              name='toggle'
              id='toggle'
              checked={isSender}
              onChange={(e) => setSender(e.target.checked)}
              className='toggle-checkbox absolute block w-6 h-6 rounded-full bg-white appearance-none cursor-pointer'
            />
            <label
              htmlFor='toggle'
              className='toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer'
            ></label>
          </div>
          <label>
            {isSender ? 'Listen to socket' : 'Send message to socket'}
          </label>
        </div>
        {isSender ? (
          <SocketMessageForm
            handleSubmitMessage={handleSubmitMessage}
            message={message}
            setMessage={setMessage}
          />
        ) : (
          displaySocketRes()
        )}
      </div>
    </div>
  );
};

const SocketMessageForm = ({
  handleSubmitMessage,
  message,
  setMessage,
}: any) => {
  return (
    <form onSubmit={handleSubmitMessage}>
      <input
        type='text'
        className='form-control'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className='btn btn-info mt-8 mb-2' type='submit'>
        Send
      </button>
    </form>
  );
};

export default SocketDisplay;
