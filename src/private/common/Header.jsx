import React from 'react'
import Logo from '../../assets/Logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { TbLogout2 } from "react-icons/tb";
import { logout } from '../../services/commonjs/auth'

const Header = () => {

    const navigate = useNavigate()

    const out = () => { 
        logout()
        navigate('/')
     }

  return (
    <div className=' flex justify-between w-screen bg-gray-900'>
        <Link to='/'>
            <div className=' absolute '>
                <img src={Logo} alt="" className=' h-16 m-5' />
                <p className=' relative bottom-10 left-8 text-white'>Dashboard</p>
            </div>
        </Link>
            <div className=' m-10'>
                <button onClick={out}>
                    <TbLogout2 fontSize='30px' color='white' />
                </button>
            </div>
    </div>
  )
}

export default Header