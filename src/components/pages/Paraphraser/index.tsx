import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';

function Paraphraser() {
  const [inputText, setInputText] = useState('')
  const [resultText, setResultText] = useState('')
  const [clicked, setClicked] = useState(false)
  // const result = 'Phasellus odio eros, aliquet id purus posuere, condimentum suscipit nisl. Cras sodales consequat mi in condimentum. Aliquam molestie viverra nibh eget rutrum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec sodales, lectus quis rutrum maximus, nunc sem hendrerit lacus, at tristique nibh arcu a est. Nam sed turpis tincidunt, porttitor diam quis, semper lectus. Sed consectetur vulputate ultrices. Sed bibendum purus felis, vel euismod turpis efficitur non. Morbi porta orci at sem dictum facilisis.'
  const handleSend = async() => {
    setClicked(true)
    const response = await axios.post('https://openai-server.onrender.com/rephrase', {prompt: inputText})
    setResultText(response.data.data)
    setClicked(false)
  }
  return (
    <div className='paraphrase-container'>
      <div className='flex flex-col m-auto justify-center align-middle items-center md:w-[50rem]  w-full'>
        <h1 className='text-3xl py-4'>Text paraphraser</h1>
        <div className='max-w-[95vw] w-full'>
          <TextareaAutosize className='input-container rounded-md w-full p-4 outline-none' autoFocus minRows={6} value={inputText} onChange={(e)=>setInputText(e.target.value)} />
          { clicked ? 
            <button className='sendBtn sendingBtn'>Send</button> :
            <button onClick={handleSend} className='sendBtn hover:bg-[#293344]'>Send</button>
          }
        </div>
        {resultText ? <p className='pt-4 text-xl'>Result</p> : null}
        <p className='pt-4 max-w-[95vw] w-full'>{resultText}</p>
      </div>
    </div>
  )
}

export default Paraphraser