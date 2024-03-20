import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { dbFirestore } from '../../services/firebase';
import ShowArticle from './ShowArticle';

const Card = ({ collectionName, documentId }) => {

  const [articleData, setArticleData] = useState(null);

  useEffect(() => {
    const fetchArticleData = async () => {
      const docRef = doc(dbFirestore, collectionName, documentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().article) {
        setArticleData(docSnap.data().article);
      } else {
        console.log("Document does not exist or does not contain 'article' field.");
      }
    };

    fetchArticleData();
  }, [collectionName, documentId]);

  if (!articleData) return <div>Loading article...</div>;

  return (
    <div>
        <ShowArticle articleId={articleData} />
    </div>
  )
}

export default Card