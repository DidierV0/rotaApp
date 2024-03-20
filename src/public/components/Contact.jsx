import React from 'react'
import Formulaire from '../common/Formulaire'

const Contact = () => {
  return (
    <div id='contact' className=' h-screen w-screen flex flex-col items-center'>
      <div className='flex'>
        <h1 className='max-md:text-4xl max-md:mt-10 max-md:mb-5 text-7xl font-extrabold text-rotaPink mt-40 mb-20 mr-5'>Nous</h1> <h1 className='max-md:text-4xl max-md:mt-10 max-md:mb-5 text-7xl font-extrabold mt-40 mb-20'>contacter</h1>
      </div>
      <div className=' max-md:w-4/5 w-2/4'>
        <Formulaire/>
      </div>
    </div>
  )
}

export default Contact