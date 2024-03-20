import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { dbFirestore, storage } from '../../services/firebase'; 


const UpdDocForm = ({ collectionName, docId }) => {

    const [descriptif, setDescriptif] = useState('');
    const [newImage, setNewImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [oldImagePath, setOldImagePath] = useState('');
  
    useEffect(() => {
      const fetchDocument = async () => {
        const docRef = doc(dbFirestore, collectionName, docId);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const data = docSnap.data();
          setDescriptif(data.descriptif || '');
          if (data.image) {
            setOldImagePath(data.image);
            getDownloadURL(ref(storage, data.image))
              .then(setImageUrl)
              .catch(error => console.error("Erreur lors de la récupération de l'image :", error));
          }
        } else {
          console.log("Document does not exist!");
        }
      };
  
      fetchDocument();
    }, [collectionName, docId]);
  
    const handleTextUpdate = async () => {
      const docRef = doc(dbFirestore, collectionName, docId);
      await updateDoc(docRef, { descriptif });
      console.log("Descriptif mis à jour avec succès !");
    };
  
    const handleImageChange = (e) => {
      if (e.target.files[0]) {
        setNewImage(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
      }
    };
  
    const handleImageUpdate = async () => {
      if (!newImage) return;
    
      // Suppression de l'ancienne image si elle existe
      if (oldImagePath) {
        const oldImageRef = ref(storage, oldImagePath);
        await deleteObject(oldImageRef).catch(error => console.error("Erreur lors de la suppression de l'ancienne image :", error));
      }
    
      // Téléchargement de la nouvelle image
      const newImagePath = `images/${Date.now()}_${newImage.name}`;
      const newImageRef = ref(storage, newImagePath);
      await uploadBytes(newImageRef, newImage).then(async () => {
        // Obtention de l'URL de téléchargement de la nouvelle image
        const newImageUrl = await getDownloadURL(newImageRef);
    
        // Mise à jour du document Firestore avec l'URL de l'image
        const docRef = doc(dbFirestore, collectionName, docId);
        await updateDoc(docRef, { image: newImageUrl }).then(() => {
          setImageUrl(newImageUrl); // Mise à jour de l'URL de l'image dans l'état local
          setOldImagePath(newImageUrl); // Mise à jour du chemin de l'image stocké dans l'état local
          console.log("Image mise à jour avec succès !");
        }).catch(error => console.error("Erreur lors de la mise à jour de l'image dans Firestore :", error));
      }).catch(error => console.error("Erreur lors du téléchargement de l'image :", error));
    };

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='text-white w-5/6'>
        <h1 className='text-xl mb-4'>Mise à jour du document</h1>
        <div className='space-y-4'>
          <div>
            <label className="block text-sm font-bold mb-2">Descriptif:</label>
            <textarea 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              rows={10}
              value={descriptif} 
              onChange={(e) => setDescriptif(e.target.value)} 
            />
            <button 
              onClick={handleTextUpdate} 
              className="mt-2 px-4 py-2 bg-rotaPink hover:bg-pink-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
            >
              Mettre à jour le texte
            </button>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Changer l'image :</label>
            <input 
              type="file" 
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-rotaPink hover:file:bg-blue-100" 
              onChange={handleImageChange} 
              accept="image/*" 
            />
            {imageUrl && <img src={imageUrl} alt="Aperçu" className="mt-4 h-44 w-44 object-cover rounded-xl shadow-md" />}
            <button 
              onClick={handleImageUpdate} 
              className="mt-2 px-4 py-2 bg-rotaPink hover:bg-pink-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
            >
              Mettre à jour l'image
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdDocForm