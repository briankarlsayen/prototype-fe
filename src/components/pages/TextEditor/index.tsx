import React, { useEffect, useState } from 'react';
import EditorJS, { EditorConfig } from '@editorjs/editorjs';
import LinkTool from '@editorjs/link';
import Header from '@editorjs/header';
import DragDrop from 'editorjs-drag-drop';
import Undo from 'editorjs-undo';
import { getNotes } from './api';

const TextEditor = () => {
  const [isLoading, setLoading] = useState(true);
  const [notes, setNotes] = useState();
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await getNotes();
      setNotes(response);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return <div>{isLoading ? null : <Editor notes={notes} />}</div>;
};

const Editor = ({ notes }: any) => {
  let editor: any = { isReady: false };
  const handleSubmit = async () => {
    const response = await editor.save();
    console.log('response', response);
  };
  useEffect(() => {
    if (!editor.isReady) {
      editor = new EditorJS({
        holder: 'editorjs',
        onChange: (api, event) => {
          getNewTextDetails(editor);
          // getNewText(event);
          // console.log("Now I know that Editor's content changed!", event);
          // console.log('details.target', event);
        },
        onReady: () => {
          new DragDrop(editor);
          new Undo({ editor });
        },
        data: notes,
      });
    }
  }, []);

  const getNewText = (event: any) => {
    console.log('event', event?.detail.target?.holder?.outerText);
    // console.log('event', event.detail);
  };
  const getNewTextDetails = async (editorInstance: any) => {
    console.log('hey');
    const response = await editorInstance.saver.save();
    console.log('response', response);
    const blocks = response.blocks;
    const lastBlock = blocks[blocks.length - 1];
    console.log('blocks', blocks);
    console.log('lastBlock', lastBlock);

    if (lastBlock && lastBlock.type === 'paragraph') {
      const newText = lastBlock.data.text;
      const newTextDetails = {
        text: newText,
        length: newText.length,
      };
      console.log('newTextDetails', newTextDetails);
      // onTextAdd(newTextDetails);
    }
  };

  return (
    <>
      <button onClick={handleSubmit}>Save</button>
      <div id='editorjs'></div>
    </>
  );
};

export default TextEditor;
