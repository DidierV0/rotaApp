import React from 'react'
import { FaHome } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { PiProjectorScreenFill } from "react-icons/pi";
import { IoMail } from "react-icons/io5";
import { Link } from 'react-scroll';

const Navbar = () => {
  return (
    <nav className=' h-fit w-16 bg-white/75 rounded-3xl shadow-lg flex flex-col justify-around'>
      <Link activeClass="active" to="hero" spy={true} smooth={true} offset={-70} duration={500}>
        <div className=' flex flex-col justify-center items-center mx-5 my-3 transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-lg'>
          <FaHome style={{ color: '#C21F5D', fontSize: '35px' }} />
          <h1 className=' text-rotaPink'>Acceuil</h1>
        </div>
      </Link>
      <Link activeClass="active" to="about" spy={true} smooth={true} offset={-70} duration={500}>
        <div className=' flex flex-col justify-center items-center mx-5 my-3 transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-lg'>
          <IoIosInformationCircle style={{ color: '#C21F5D', fontSize: '35px' }}/>
          <h1 className=' text-rotaPink '>A propos</h1>
        </div>
      </Link>
      <Link activeClass="active" to="project" spy={true} smooth={true} offset={-70} duration={500}>
        <div className=' flex flex-col justify-center items-center mx-5 my-3 transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-lg'>
          <PiProjectorScreenFill style={{ color: '#C21F5D', fontSize: '35px' }}/>
          <h1 className=' text-rotaPink'>Actions</h1>
        </div>
      </Link>
      <Link activeClass="active" to="contact" spy={true} smooth={true} offset={-70} duration={500}>
        <div className=' flex flex-col justify-center items-center mx-5 my-3 transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-lg'>
          <IoMail style={{ color: '#C21F5D', fontSize: '35px' }}/>
          <h1 className=' text-rotaPink'>Contact</h1>
        </div>
      </Link>
    </nav>
  )
}

export default Navbar