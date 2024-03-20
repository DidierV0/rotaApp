import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { dbFirestore } from '../../services/firebase';

const ShowArticle = ({articleId}) => {

    const [article, setArticle] = useState(null);

    useEffect(() => {
      // Fonction pour charger les détails de l'article depuis Firestore
      const fetchArticle = async () => {
        if (articleId) {
          const docRef = doc(dbFirestore, "articles", articleId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setArticle(docSnap.data());
          } else {
            console.log("No such article!");
          }
        }
      };
  
      fetchArticle();
    }, [articleId]);
  
    if (!article) return <div>Loading...</div>;

    
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      {article.images && article.images[0] && (
        <div style={{ backgroundImage: `url(${article.images[0]})` }} className="h-48 w-full bg-cover"></div>
      )}
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{article.date}</div>
        <p className="block mt-1 text-lg leading-tight font-medium text-black">{article.title}</p>
        <p className="mt-2 text-gray-500">{article.subtitle}</p>
      </div>
    </div>
  )
}

export default ShowArticle