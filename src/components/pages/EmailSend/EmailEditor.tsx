import EmailEditor from 'react-email-editor';

import onBoardTemp from './templates/onboardMail.json';
import newYearTemp from './templates/newYearSale.json';
import absenceTemp from './templates/absence.json';

const Editor = ({ template, emailEditorRef, setSaved, messageText }: any) => {
  const getFromStorage = () => {
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

  const getFromJson = () => {
    const templates = [
      {
        title: 'new-year-sale',
        jsonTemp: newYearTemp,
      },
      {
        title: 'onboard',
        jsonTemp: onBoardTemp,
      },
      {
        title: 'absence',
        jsonTemp: absenceTemp,
      },
    ];
    const tempId = templates.findIndex((el) => el.title === template);
    if (template && emailEditorRef.current)
      emailEditorRef.current.editor.loadDesign(templates[tempId].jsonTemp);
    emailEditorRef.current?.editor.addEventListener(
      'design:updated',
      function () {
        setSaved(false);
      }
    );
  };

  const onLoad = () => {
    console.log('loading...');
    getFromJson();
    // getFromStorage();
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
          value:
            '<span style="margin: 0px; line-height: 0px;">This is a new Text block. Change the text.</span>',
          // value: 'shemay',
        },
        lineHeight: {
          value: '100%',
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
        tools={tools}
        // style={{ margin: '0px' }}
      />
      <button className='btn' onClick={getMsgBody}>
        Msg body
      </button>
    </div>
  );
};

export default Editor;
