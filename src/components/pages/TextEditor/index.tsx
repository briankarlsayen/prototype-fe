import React from 'react';
import EditorJS from '@editorjs/editorjs';
import LinkTool from '@editorjs/link';
import Header from '@editorjs/header';

const TextEditor = () => {
  const editor = new EditorJS({
    holder: 'editorjs',
    onReady: () => {
      console.log('Editor.js is ready to work!');
    },
    onChange: (api, event) => {
      console.log("Now I know that Editor's content changed!", event);
    },
    tools: {
      linkTool: {
        class: LinkTool,
        config: {
          endpoint: 'http://localhost:5700/urldata', // Your backend endpoint for url data fetching,
          // headers: {
          //   'Content-Type': 'application/json',
          // },
        },
      },
      header: Header,
    },
  });
  return (
    <div className='bg-gray-200 font-black'>
      <div id='editorjs'></div>
    </div>
  );
};

export default TextEditor;
