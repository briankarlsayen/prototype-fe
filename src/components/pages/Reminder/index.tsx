import React from 'react'

const Reminder = () => {
  return (
    <div className='w-full flex justify-center'>
      <div className='flex flex-col w-full text-center'>
        <h1 className='text-3xl pt-4 text-center'>Reminder</h1>
        <h2 className='uppercase text-sm pb-8 text-[#979797]'>Comming soon!</h2>
        {/* <h3 className='text-xl'>Comming soon</h3> */}
        <p className='text-xl pb-2'>Function</p>
        <ul>
          <li className='py-1'>Able to add task</li>
          <li className='py-1'>Send calendar notifications</li>
          <li className='py-1'>Recuring task</li>
          <li className='py-1'>See progress report</li>
        </ul>
      </div>
    </div>
  )
}

export default Reminder