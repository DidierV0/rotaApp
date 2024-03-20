import React from 'react'
import Logo from '../../assets/Logo.png'

const Welcome = () => {
  return (
    <div className='flex flex-col items-center justify-center font-semibold'>
      <div>
        <h1 className=' text-white text-8xl text-center mt-40'>Bienvenue sur votre espace administrateur</h1>
      </div>
      <img src={Logo} alt="" />
    </div>
  )
}

export default Welcome