import React, { useState } from 'react'
import { dbFirestore, storage } from '../../../services/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';

const Publier = () => {

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [author, setAuthor] = useState('');
  const [paragraphs, setParagraphs] = useState(['', '', '']);
  const [images, setImages] = useState([null, null, null]);
  const [imageUrls, setImageUrls] = useState(['', '', '']);

  const handleParagraphChange = (text, index) => {
    const newParagraphs = [...paragraphs];
    newParagraphs[index] = text;
    setParagraphs(newParagraphs);
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      setImageUrls(imageUrls.map((url, idx) => idx === index ? tempUrl : url));
      setImages(images.map((img, idx) => idx === index ? file : img));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Télécharger les images et obtenir leurs URLs
    const uploadedImageUrls = await Promise.all(
      images.map(async (image) => {
        if (image) {
          const imageRef = ref(storage, `articles/${Date.now()}_${image.name}`);
          const snapshot = await uploadBytes(imageRef, image);
          const downloadUrl = await getDownloadURL(snapshot.ref);
          return downloadUrl;
        }
        return '';
      })
    );

    // Générer la date du jour au format JJ/MM/AAAA
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    try {
      await addDoc(collection(dbFirestore, "articles"), {
        title,
        subtitle,
        date: formattedDate,
        author,
        paragraphs,
        images: uploadedImageUrls.filter(url => url !== ''), // Filtrer les URLs vides
      });
      alert("Article publié avec succès !");
      // Réinitialisation du formulaire après la publication
      setTitle('');
      setSubtitle('');
      // setDate('');
      setAuthor('');
      setParagraphs(['', '', '']);
      setImageUrls(['', '', '']);
      setImages([null, null, null]);
    } catch (error) {
      console.error("Erreur lors de la publication de l'article :", error);
      alert("Erreur lors de la publication de l'article.");
    }
  };


  return (
  <div>
    <div className=' text-white'>
      <h1 className=' text-3xl'>Publier</h1>
    </div>
    <div className=" my-8 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <input
            type="text"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" w-1/3 p-2 border rounded focus:outline-none focus:border-rotaPink"
          />
          <input
            type="text"
            placeholder="Sous-titre"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:border-rotaPink"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="grid grid-cols-1 gap-4 mb-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index}>
              <input
                type="file"
                onChange={(e) => handleImageChange(e, index)}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-rotaPink hover:file:bg-blue-100 mb-2"
                accept="image/*"
              />
              {imageUrls[index] && <img src={imageUrls[index]} alt={`Preview ${index + 1}`} className="h-32 w-full object-cover rounded-lg shadow-md" />}
            </div>
            ))}
          </div>
          <div className="flex flex-col md:w-1/2">
            {paragraphs.map((paragraph, index) => (
              <textarea
                key={index}
                rows={6}
                placeholder={`Paragraphe ${index + 1}`}
                value={paragraph}
                onChange={(e) => handleParagraphChange(e.target.value, index)}
                className="mb-2 p-2 border rounded focus:outline-none focus:border-rotaPink"
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-rotaPink text-white rounded hover:bg-pink-700"
        >
          Publier l'article
        </button>
      </form>
    </div>
  </div>
  )
}

export default Publier