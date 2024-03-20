import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { dbFirestore, storage } from '../../services/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const BoardForm = () => {

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [position, setPosition] = useState('');
    const [ordre, setOrdre] = useState(0);
    const [photo, setPhoto] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        // Téléchargez la photo dans Firebase Storage
        const photoPath = `bureauPhotos/${photo.name}`;
        const photoRef = ref(storage, photoPath);
        await uploadBytes(photoRef, photo);
        const photoURL = await getDownloadURL(photoRef);

        // Ajoutez les données dans Firestore
        try {
        await addDoc(collection(dbFirestore, "bureau"), {
            nom,
            prenom,
            position,
            ordre,
            photo: photoURL,
        });
        alert("Membre du bureau ajouté avec succès !");
        // Réinitialisez le formulaire ou effectuez d'autres actions ici
        } catch (error) {
        console.error("Erreur lors de l'ajout du membre du bureau :", error);
        alert("Erreur lors de l'ajout du membre du bureau.");
        } finally {
        setUploading(false);
        }
    };

  return (
    <div className="max-w-md p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nom" className="block text-gray-700 text-sm font-bold mb-2">Nom:</label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label htmlFor="prenom" className="block text-gray-700 text-sm font-bold mb-2">Prénom:</label>
          <input
            type="text"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label htmlFor="position" className="block text-gray-700 text-sm font-bold mb-2">Position:</label>
          <input
            type="text"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label htmlFor="photo" className="block text-gray-700 text-sm font-bold mb-2">Photo:</label>
          <input
            type="file"
            id="photo"
            onChange={handlePhotoChange}
            className="block w-full text-sm text-gray-700
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-rotaPink
            hover:file:bg-blue-100
          "             accept="image/*"
            required
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className={`px-4 py-2 font-bold rounded focus:outline-none focus:shadow-outline ${uploading ? 'bg-gray-500' : 'bg-rotaPink hover:bg-pink-700'} text-white`}
        >
          {uploading ? 'Ajout en cours...' : 'Ajouter'}
        </button>
      </form>
    </div>
  )
}

export default BoardForm