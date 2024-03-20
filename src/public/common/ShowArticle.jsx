import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { dbFirestore } from '../../services/firebase';
import { DetailArticle } from './Navigation';

const ShowArticle = ({ articleId }) => {
  

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
    <DetailArticle articleId={articleId}>

    <div className=" max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-10 transition duration-300 ease-in-out transform hover:bg-pink-400 hover:-translate-y-2 hover:shadow-lg">
      {article.images && article.images[0] && (
        <div style={{ backgroundImage: `url(${article.images[0]})` }} className=" max-md:h-32 h-48 w-full bg-cover"></div>
        )}
      <div className="px-8 py-2 max-md:p-2">
        <div className=" max-md:hidden uppercase tracking-wide text-sm text-indigo-500 font-semibold">{article.date}</div>
        <p className=" max-md:hidden block mt-1 text-lg leading-tight font-medium text-black">{article.title}</p>
        <p className=" md:hidden max-md:w-24 max-md:text-sm block mt-1 text-lg leading-tight font-medium text-black">{article.subtitle.slice(0, 20)}{article.title.length > 20 ? "..." : ""}</p>
        <p className="max-md:hidden mt-2 text-gray-500">{article.subtitle.slice(0, 30)}{article.subtitle.length > 30 ? "..." : ""}</p>
      </div>
    </div>
    </DetailArticle>
  )
}

export default ShowArticle