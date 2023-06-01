import React, { useEffect } from 'react';
import EditorJS, { EditorConfig } from '@editorjs/editorjs';
import LinkTool from '@editorjs/link';
import Header from '@editorjs/header';
import DragDrop from 'editorjs-drag-drop';
import Undo from 'editorjs-undo';

const TextEditor = () => {
  let editor: any = { isReady: false };
  useEffect(() => {
    if (!editor.isReady) {
      editor = new EditorJS({
        holder: 'editorjs',
        onChange: (api, event) => {
          console.log("Now I know that Editor's content changed!", event);
        },
        onReady: () => {
          new DragDrop(editor);
          new Undo({ editor });
        },
      });
    }
  }, []);
  const handleSubmit = async () => {
    const response = await editor.save();
    console.log('response', response);
  };

  return (
    <div>
      <button onClick={handleSubmit}>Save</button>
      <div id='editorjs'></div>
    </div>
  );
};

export default TextEditor;
