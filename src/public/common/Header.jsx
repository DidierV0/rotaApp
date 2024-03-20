import React from 'react'
import Logo from '../../assets/Logo.png'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <Link to='/'>
      <img src={Logo} alt="" className=' h-16 m-5' />
    </Link>
  )
}

export default Header