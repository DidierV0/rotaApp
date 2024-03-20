import React from 'react'
import TabOnglet from '../common/TabOnglet'



const About = () => { 
  return (
    <div id='about' className=' h-screen w-screen flex flex-col items-center'>
      <div className='flex'>
        <h1 className=' max-md:text-4xl max-md:mt-10 max-md:mb-5  text-7xl font-extrabold text-rotaPink mt-20 mb-20 mr-5'>A</h1> <h1 className=' max-md:text-4xl max-md:mt-10 max-md:mb-5  text-7xl font-extrabold mt-20 mb-20'>propos</h1>
      </div>

      <div className=' w-2/4 max-md:w-11/12'>
        <TabOnglet/>
      </div>
    </div>
  )
}

export default About