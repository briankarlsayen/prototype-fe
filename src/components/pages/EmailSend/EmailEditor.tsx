import EmailEditor from 'react-email-editor';
// import template from "./design001.json";
import custom from './custom.js';

const Editor = ({ emailEditorRef, setSaved, messageText }: any) => {
  const onLoad = () => {
    console.log('loading...');
    // emailEditorRef.current.editor.loadDesign(template);
    const template = localStorage.getItem('design');
    if (template && emailEditorRef.current)
      emailEditorRef.current.editor.loadDesign(JSON.parse(template));
    emailEditorRef.current?.editor.addEventListener(
      'design:updated',
      function () {
        setSaved(false);
      }
    );
  };

  const dummyMessage = `sad
  adas<br/>
  asdasd </br>
  ad`;

  const handleMessageSpacing = (message: string) => {
    const processedMsg = message.replace(/\r?\n|\r|\n/g, '<br/>');
    console.log('processedMsg', processedMsg);
    return processedMsg;
  };

  const options = {
    designTags: {
      // message_txt: messageText,
      message_txt: handleMessageSpacing(messageText),
      // message_txt: dummyMessage,
    },
  };

  const onReady = () => {
    console.log('onReady');
    console.log('dummy', dummyMessage);
  };

  const tools = {
    text: {
      // enabled: false,
      properties: {
        text: {
          value: dummyMessage,
        },
      },
    },
  };

  const getMsgBody = () => {
    const body = document.getElementById('editor');
    console.log('message_body', body);
  };

  return (
    <div>
      <div id='messageBody'></div>
      <EmailEditor
        ref={emailEditorRef}
        options={options}
        onLoad={onLoad}
        onReady={onReady}
        // tools={tools}
      />
      <button className='btn' onClick={getMsgBody}>
        Msg body
      </button>
    </div>
  );
};

export default Editor;
