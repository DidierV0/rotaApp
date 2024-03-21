import React from 'react'
import Fond from '../../assets/fond.webp'
import Logo from '../../assets/Logo.png'
import { Link } from 'react-scroll'

const Hero = () => {
  return (
    <div id='hero' style={{backgroundImage: `url(${Fond})`, }} className=' h-screen w-screen flex flex-col justify-center items-center object-none object-center bg-no-repeat'>
      <div><img src={Logo} alt="" /></div> 
      <div className=' flex max-md:flex-col max-md:items-center max-md:justify-center '>
        <div className=''>
          <Link activeClass="active" to="about" spy={true} smooth={true} offset={-70} duration={500}>
            <button className=' bg-white mx-5 mt-10 w-80 py-2 text-2xl rounded-3xl shadow-lg' >Qui sommes nous?</button>
          </Link>
        </div>
        <div>
          <Link activeClass="active" to="contact" spy={true} smooth={true} offset={-70} duration={500}>
            <button className=' bg-rotaPink text-white mx-5 mt-10 w-80 py-2 text-2xl rounded-3xl shadow-lg'>Je rejoins!</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero