import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { dbFirestore } from '../../services/firebase';
import ShowArticle from './ShowArticle';


const CardUne = ({ docId }) => {
    
    const [articleId, setArticleId] = useState('');

  useEffect(() => {
    // Charger l'ID de l'article actuel à la une
    const fetchArticleId = async () => {
      const docRef = doc(dbFirestore, "aLaUne", docId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setArticleId(docSnap.data().article || '');
      } else {
        console.log("Document does not exist!");
      }
    };

    fetchArticleId();
  }, [docId]);

  const handleArticleIdChange = (e) => {
    setArticleId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mettre à jour le champ article du document dans Firestore
    const docRef = doc(dbFirestore, "aLaUne", docId);
    await updateDoc(docRef, { article: articleId });
    alert("Article ID updated successfully!");
  };

  return (
    <div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-10 ">
        <label htmlFor="articleId" className="block font-medium text-white text-xl">
            Article ID:
        </label>
        <input
            id="articleId"
            type="text"
            value={articleId}
            onChange={handleArticleIdChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rotaPink hover:bg-rotaPink-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rotaPink"
        >
            Update Article
        </button>
        </form>
        <ShowArticle articleId={articleId} />
    </div>
  )
}

export default CardUne