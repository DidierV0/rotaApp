import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {

  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white text-center p-5 w-screen h-fit">
      <div className=" max-md:hidden mb-3 flex justify-center items-center absolute bottom-5">
        <a href="https://www.facebook.com/rotaract.lamentin.martinique?locale=fr_FR" className="mx-2 hover:text-gray-300"><FaFacebook style={{fontSize: '50px'}} /></a>
        <a href="https://www.instagram.com/rotaract_lamentin?igsh=MnUzMXNpYmtrazl2" className="mx-2 hover:text-gray-300"><FaInstagram style={{fontSize: '50px'}}/></a>
      </div>
      <div className=" md:hidden mb-3 flex justify-center items-center absolute bottom-34">
        <a href="https://www.facebook.com/rotaract.lamentin.martinique?locale=fr_FR" className="mx-2 hover:text-gray-300"><FaFacebook style={{fontSize: '25px'}} /></a>
        <a href="https://www.instagram.com/rotaract_lamentin?igsh=MnUzMXNpYmtrazl2" className="mx-2 hover:text-gray-300"><FaInstagram style={{fontSize: '25px'}}/></a>
      </div>
      <div className="mb-3 flex justify-end items-end bottom-6">
        <Link to='/login'>
        <p>Connexion</p>
        </Link>
      </div>
      {/* <div className="mb-3">
        <a href="mailto:contact@example.com" className="hover:text-gray-300">contact@example.com</a> | 
        <a href="tel:+1234567890" className="hover:text-gray-300">+1 234 567 890</a>
      </div>
      <div className="mb-3">
        <a href="/privacy-policy" className="hover:text-gray-300">Politique de confidentialité</a> | 
        <a href="/terms" className="hover:text-gray-300">Mentions légales</a>
      </div> */}
      <div>
        &copy; {year} Rotaract Club du Lamentin. Tous droits réservés.
      </div>
    </footer>
  )
}

export default Footer