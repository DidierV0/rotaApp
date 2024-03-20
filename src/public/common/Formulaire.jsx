import React, { useState } from 'react'
import { addDataToCollection } from '../../services/commonjs/db';

const Formulaire = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        addDataToCollection("messages", formData)
        console.log(formData);
        alert("Formulaire soumis. Vérifiez la console pour les données.");
      };

  return (
    <div >
        <form onSubmit={handleSubmit} className=" max-md:p-0 w-full mx-auto my-10 p-5">
            <div className='flex justify-between'>
                <div className=" max-md:w-full max-md:mx-1 mb-5 w-2/5">
                    <label htmlFor="firstName" className="block mb-2 text-xl font-medium text-gray-900">Prénom</label>
                    <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rotaPink focus:border-rotaPink block w-full p-2.5" required />
                </div>
                <div className=" max-md:w-full max-md:mx-1 mb-5 w-2/5">
                    <label htmlFor="lastName" className="block mb-2 text-xl font-medium text-gray-900">Nom</label>
                    <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rotaPink focus:border-rotaPink block w-full p-2.5" required />
                </div>
            </div>

            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-xl font-medium text-gray-900">Email</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rotaPink focus:border-rotaPink block w-full p-2.5" required />
            </div>
            <div className="mb-5">
                <label htmlFor="message" className="block mb-2 text-xl font-medium text-gray-900">Message</label>
                <textarea name="message" id="message" value={formData.message} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-rotaPink focus:border-rotaPink block w-full p-2.5" rows="4" required></textarea>
            </div>
            <button type="submit" className="text-white bg-rotaPink hover:bg-rotaPink focus:ring-4 focus:ring-rotaPink/30 font-medium rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center">Envoyer</button>
        </form>
    </div>
  )
}

export default Formulaire